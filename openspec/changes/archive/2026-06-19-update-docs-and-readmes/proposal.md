## Why

Several changes were made to the project recently (like changing the API port to 3001 and adding comprehensive automated tests with Newman), but the documentation was not fully updated to reflect this. Additionally, important subdirectories in the project lack README files, which makes it harder for developers to understand the structure and purpose of these internal directories.

## What Changes

- Create a `README.md` in `src/config/`.
- Create a `README.md` in `src/middlewares/`.
- Create a `README.md` in `src/utils/`.
- Create a `README.md` in `tests/`.
- Document recent changes such as the test execution process and the new API port (3001).

## Capabilities

### New Capabilities
- `module-readmes`: Dedicated README documentation for internal project directories.

### Modified Capabilities

## Impact

- **Documentation**: Significant improvement in code discoverability.
- **Onboarding**: Easier for new team members to understand module responsibilities and testing instructions.
