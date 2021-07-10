const { DUPLICATED_KEY } = require('src/domain/enums/EnumDatabaseErrors');
const { EMAIL_ALREADY_EXIST } = require('src/domain/enums/MessageErrors');


class CreateUserOperation {
    constructor({
        userRepository,
        logger,
        exception,
    }) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.exception = exception;
    }

    async execute(user) {
        try {

            return await this.userRepository.create(user);

        } catch (error) {
            this.logger.error({ file: 'CreateUserOperation', debugPayload: user });

            if (error.code == DUPLICATED_KEY)
                throw this.exception.duplicateKeyError(EMAIL_ALREADY_EXIST);

            throw this.exception.internalServer();
        }
    }
}

module.exports = CreateUserOperation;