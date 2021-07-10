const { USER_NOT_FOUND } = require('src/domain/enums/MessageErrors');

class CreateUserOperation {
    constructor({
        userRepository,
        logger,
        exception
    }) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.exception = exception;
    }

    async get(query) {

        try {
            const userFromDatabase = await this.userRepository.get(query);

            if (!userFromDatabase) {
                this.logger.error({ file: 'GetUserOperation', debugPayload: query });
                throw this.exception.notFound(USER_NOT_FOUND);
            }

            return userFromDatabase;

        } catch (error) {
            this.logger.error({ file: 'GetUserOperation', debugPayload: query, error });
            throw this.exception.internalServer();
        }
    }

    async getAll() {

        try {
            const userFromDatabase = await this.userRepository.getAll();

            return userFromDatabase;

        } catch (error) {
            this.logger.error({ file: 'GetUserOperation', error });
            throw this.exception.internalServer();
        }
    }
}

module.exports = CreateUserOperation;