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

    async execute(query) {

        const userFromDatabase = await this.userRepository.update(query);

        if (!userFromDatabase) {
            this.logger.error({ file: 'UpdateUserOperation' });
            throw this.exception.notFound(USER_NOT_FOUND);
        }

        return userFromDatabase;
    }
}

module.exports = CreateUserOperation;