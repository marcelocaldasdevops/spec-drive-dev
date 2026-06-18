const orderRepository = require('./orderRepository');
const cartService = require('../cart/cartService');
const productRepository = require('../products/productRepository');
const AppError = require('../../utils/AppError');
const logger = require('../../config/logger');

const orderService = {
    listOrders: async (userId) => {
        return await orderRepository.findManyByUser(userId);
    },

    checkout: async (userId) => {
        // 1. Recuperar Carrinho
        const cart = await cartService.getCart(userId);
        if (!cart || cart.items.length === 0) {
            throw new AppError('Carrinho vazio', 400, 'INVALID_PAYLOAD');
        }

        // 2. Recalcular Preços e Validar (Snapshot)
        let totalValue = 0;
        const validItems = [];

        for (const item of cart.items) {
            const product = await productRepository.findById(item.productId);
            if (!product) {
                throw new AppError(`Produto ${item.productId} não existe mais`, 409, 'CONFLICT');
            }
            if (product.status !== 'ACTIVE') {
                throw new AppError(`Produto ${product.name} indisponível`, 409, 'CONFLICT');
            }

            validItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: Number(product.price)
            });
            totalValue += Number(product.price) * item.quantity;
        }

        // 3. Executar Transação no Banco
        let order;
        try {
            order = await orderRepository.createOrderTransaction(userId, validItems, totalValue);
        } catch (error) {
            logger.error(`Checkout falhou: ${error.message}`);
            throw new AppError('Erro ao processar pedido ou estoque', 500, 'INTERNAL_SERVER_ERROR');
        }

        // 4. Limpar Carrinho e Reservas definitivas
        const redisClient = require('../../config/redis');
        await redisClient.del(`cart:default:${userId}`);

        // Remove as reservas atreladas sem devolver o estoque ao Redis
        for (const item of validItems) {
            const reserveKey = `cart:reserve:${userId}:${item.productId}`;
            await redisClient.del(reserveKey);
            await redisClient.zRem('cart:expirations', `${userId}:${item.productId}`);
        }

        // 5. Emitir Evento (Simulado)
        logger.info(`Evento Emitido: order.created { orderId: ${order.id} }`);

        return order;
    }
};

module.exports = orderService;
