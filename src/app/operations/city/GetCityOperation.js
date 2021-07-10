const { CITY_NOT_FOUND } = require('src/domain/enums/MessageErrors');

class CreateUserOperation {
    constructor({
        cityRepository,
        logger,
        exception
    }) {
        this.cityRepository = cityRepository;
        this.logger = logger;
        this.exception = exception;
    }

    async get(query) {

        const cityFromDatabase = await this.cityRepository.get(query);

        if (!cityFromDatabase.length) {
            this.logger.error({ file: 'GetCityOperation', debugPayload: query });
            throw this.exception.notFound(CITY_NOT_FOUND);
        }

        return cityFromDatabase;
    }

    async getAll() {

        const cityFromDatabase = await this.cityRepository.getAll();

        return cityFromDatabase;
    }
}

module.exports = CreateUserOperation;