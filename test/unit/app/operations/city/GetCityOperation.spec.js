const { expect, spy } = require('chai');
const GetCityOperation = require('src/app/operations/city/GetCityOperation');
const { CITY_NOT_FOUND } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: City :: GetCityOperation', () => {

    describe('#get', () => {
        context('when runs with success', () => {

            let getCityOperation, cityRepository = {}, logger = {}, cityRequested = { name: 'any' }, cityFromDatabase = { city: 'any' };

            before(() => {

                spy.on(cityRepository, 'get', () => Promise.resolve([cityFromDatabase]));
                spy.on(logger, 'error', () => null);

                getCityOperation = new GetCityOperation({ cityRepository, logger });
            });

            it('returns requested city', async () => {
                const response = await getCityOperation.get(cityRequested);
                expect(cityRepository.get).to.be.called.once.with.exactly(cityRequested);
                expect(response).to.be.deep.equals([cityFromDatabase]);

            });
        });
    });

    describe('#get', () => {
        context('when does not exists', () => {

            let cityRepository = {}, getCityOperation, logger = {}, exception = {}, cityRequested = { name: 'any' };

            before(() => {

                spy.on(cityRepository, 'get', () => Promise.resolve([]));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                getCityOperation = new GetCityOperation({ cityRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await getCityOperation.get(cityRequested);
                } catch (error) {
                    expect(cityRepository.get).to.be.called.once.with.exactly(cityRequested);
                    expect(exception.notFound).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(CITY_NOT_FOUND);
                    expect(error).to.be.exist();
                }
            });
        });
    });

    describe('#getAll', () => {
        context('when runs with success', () => {

            let cityRepository = {}, getCityOperation, logger = {}, exception = {}, citiesFromDatabase = [{ any: 'any' }, { any: 'any' }];

            before(() => {

                spy.on(cityRepository, 'getAll', () => Promise.resolve(citiesFromDatabase));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                getCityOperation = new GetCityOperation({ cityRepository, logger, exception });

            });

            it('returns all cities', async () => {
                const response = await getCityOperation.getAll();
                expect(cityRepository.getAll).to.be.called.once.with.exactly();
                expect(response).to.be.deep.equals(citiesFromDatabase);
                expect(exception.notFound).to.have.not.been.called();
                expect(logger.error).to.have.not.been.called();
            });
        });
    });
});