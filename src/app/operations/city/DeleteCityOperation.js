const { CITY_NOT_FOUND } = require('src/domain/enums/MessageErrors');

class DeleteCityOperation {
    constructor({
        cityRepository,
        logger,
        exception
    }) {
        this.cityRepository = cityRepository;
        this.logger = logger;
        this.exception = exception;
    }

    async execute(query) {

        const cityFromDatabase = await this.cityRepository.delete(query);

        if (!cityFromDatabase) {
            this.logger.error({ file: 'DeleteUserOperation', debugPayload: query });
            throw this.exception.notFound(CITY_NOT_FOUND);
        }

        return cityFromDatabase;
    }
}

module.exports = DeleteCityOperation;