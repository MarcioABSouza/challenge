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

        const userFromDatabase = await this.userRepository.get(query);

        if (!userFromDatabase.length) {
            this.logger.error({ file: 'GetUserOperation', debugPayload: query });
            throw this.exception.notFound(USER_NOT_FOUND);
        }

        return userFromDatabase;
    }

    async getAll() {

        const userFromDatabase = await this.userRepository.getAll();

        return userFromDatabase;
    }
}

module.exports = CreateUserOperation;