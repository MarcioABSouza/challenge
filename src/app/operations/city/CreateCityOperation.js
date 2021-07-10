const { DUPLICATED_KEY } = require('src/domain/enums/EnumDatabaseErrors');
const { CITY_ALREADY_EXISTS } = require('src/domain/enums/MessageErrors');


class CreateCityOperation {
    constructor({
        cityRepository,
        logger,
        exception,
    }) {
        this.cityRepository = cityRepository;
        this.logger = logger;
        this.exception = exception;
    }

    async execute(city) {
        try {

            return await this.cityRepository.create(city);

        } catch (error) {
            this.logger.error({ file: 'CreateCityOperation', debugPayload: city, error });

            if (error.code == DUPLICATED_KEY)
                throw this.exception.duplicateKeyError(CITY_ALREADY_EXISTS);

            throw this.exception.internalServer();
        }
    }
}

module.exports = CreateCityOperation;