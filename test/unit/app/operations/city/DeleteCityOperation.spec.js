const { expect, spy } = require('chai');
const DeleteCityOperation = require('src/app/operations/city/DeleteCityOperation');
const { CITY_NOT_FOUND } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: City :: DeleteCityOperation', () => {

    describe('#execute', () => {
        context('when runs with success', () => {

            let deleteCityOperation, cityRepository = {}, logger = {}, cityToBeDeleted = {cep:'any'};

            before(() => {

                spy.on(cityRepository, 'delete', () => Promise.resolve(cityToBeDeleted));
                spy.on(logger, 'error', () => null);

                deleteCityOperation = new DeleteCityOperation({ cityRepository, logger });
            });

            it('returns deleted city', async () => {
                const response = await deleteCityOperation.execute(cityToBeDeleted);
                expect(cityRepository.delete).to.be.called.once.with.exactly(cityToBeDeleted);
                expect(response).to.be.deep.equals(cityToBeDeleted);

            });
        });
    });

    describe('#execute', () => {
        context('when city already exists', () => {

            let cityRepository = {}, deleteCityOperation, logger = {}, exception = {}, cityToBeDeleted = {cep:'any'};

            before(() => {

                spy.on(cityRepository, 'delete', () => Promise.resolve(null));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                deleteCityOperation = new DeleteCityOperation({ cityRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await deleteCityOperation.execute(cityToBeDeleted);
                } catch (error) {
                    expect(cityRepository.delete).to.be.called.once.with.exactly(cityToBeDeleted);
                    expect(exception.notFound).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(CITY_NOT_FOUND);
                    expect(error).to.be.exist();
                }
            });
        });
    });
});