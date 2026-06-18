const redisClient = require('../../config/redis');
const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');

const CART_TTL = 15 * 60; // 15 minutos

const cartService = {
    getCart: async (userId, tenantId = 'default') => {
        const key = `cart:${tenantId}:${userId}`;
        const cartData = await redisClient.get(key);
        return cartData ? JSON.parse(cartData) : { items: [], total: 0 };
    },

    reserveStock: async (userId, productId, quantity) => {
        const stockKey = `stock:available:${productId}`;
        const reserveKey = `cart:reserve:${userId}:${productId}`;
        
        const remainingStock = await redisClient.decrBy(stockKey, quantity);
        
        if (remainingStock < 0) {
            await redisClient.incrBy(stockKey, quantity);
            throw new AppError('Estoque insuficiente', 409, 'OUT_OF_STOCK');
        }
        
        const newReserve = await redisClient.incrBy(reserveKey, quantity);
        await redisClient.expire(reserveKey, CART_TTL);

        // Atualiza Sorted Set para o CRON de expiração
        const expireAt = Date.now() + (CART_TTL * 1000);
        await redisClient.zAdd('cart:expirations', [{ score: expireAt, value: `${userId}:${productId}` }]);
        
        return true;
    },

    releaseStock: async (userId, productId, quantity) => {
        const stockKey = `stock:available:${productId}`;
        const reserveKey = `cart:reserve:${userId}:${productId}`;
        
        await redisClient.incrBy(stockKey, quantity);
        
        const remainingReserve = await redisClient.decrBy(reserveKey, quantity);
        if (remainingReserve <= 0) {
            await redisClient.del(reserveKey);
            await redisClient.zRem('cart:expirations', `${userId}:${productId}`);
        }
    },

    processExpirations: async () => {
        const now = Date.now();
        // Busca reservas cujo timestamp de expiração já passou
        const expired = await redisClient.zRangeByScore('cart:expirations', 0, now);
        
        for (const member of expired) {
            const [userId, productId] = member.split(':');
            const reserveKey = `cart:reserve:${userId}:${productId}`;
            
            // Tenta resgatar a quantidade (pode já estar zero ou deletada)
            const qtyStr = await redisClient.get(reserveKey);
            const quantity = qtyStr ? parseInt(qtyStr, 10) : 0;
            
            if (quantity > 0) {
                const stockKey = `stock:available:${productId}`;
                await redisClient.incrBy(stockKey, quantity);
                await redisClient.del(reserveKey);
            }
            await redisClient.zRem('cart:expirations', member);
        }
    },

    addItem: async (userId, itemData, tenantId = 'default') => {
        const { productId, quantity } = itemData;
        const key = `cart:${tenantId}:${userId}`;

        // Validar Produto e Estoque
        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            throw new AppError('Produto não encontrado', 404, 'RESOURCE_NOT_FOUND');
        }

        // Tenta reservar o estoque atômicamente no Redis
        await cartService.reserveStock(userId, productId, quantity);

        // Buscar carrinho atual
        let cart = await cartService.getCart(userId, tenantId);

        // Atualizar ou Adicionar Item
        const existingItemIndex = cart.items.findIndex(i => i.productId === productId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name: product.name,
                price: Number(product.price),
                quantity
            });
        }

        // Recalcular total
        cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Salvar no Redis
        await redisClient.set(key, JSON.stringify(cart), { EX: CART_TTL });

        return cart;
    },

    removeItem: async (userId, productId, tenantId = 'default') => {
        const key = `cart:${tenantId}:${userId}`;
        let cart = await cartService.getCart(userId, tenantId);

        const itemToRemove = cart.items.find(item => item.productId === productId);
        if (itemToRemove) {
            await cartService.releaseStock(userId, productId, itemToRemove.quantity);
        }

        cart.items = cart.items.filter(item => item.productId !== productId);
        cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await redisClient.set(key, JSON.stringify(cart), { EX: CART_TTL });
        return cart;
    }
};

module.exports = cartService;
