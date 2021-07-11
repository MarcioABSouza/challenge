const { expect, spy } = require('chai');
const CreateCityOperation = require('src/app/operations/city/CreateCityOperation');
const { CITY_ALREADY_EXISTS } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: City :: CreateCityOperation', () => {

    describe('#execute', () => {
        context('when runs with succes', () => {

            let createCityOperation, cityRepository = {}, logger = {}, cityFromDatabase, cityToBeCreated;

            before(() => {

                spy.on(cityRepository, 'create', () => Promise.resolve(cityFromDatabase));
                spy.on(logger, 'error', () => null);

                createCityOperation = new CreateCityOperation({ cityRepository, logger });
            });

            it('returns created city', async () => {
                const response = await createCityOperation.execute(cityToBeCreated);
                expect(cityRepository.create).to.be.called.once.with.exactly(cityToBeCreated);
                expect(response).to.be.deep.equals(cityFromDatabase);

            });
        });
    });

    describe('#execute', () => {
        context('when city already exists', () => {

            let cityRepository = {}, createCityOperation, logger = {}, exception = {};

            before(() => {

                spy.on(cityRepository, 'create', () => Promise.reject({ code: 11000 }));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'duplicateKeyError', (msg) => { return new Error(msg); });

                createCityOperation = new CreateCityOperation({ cityRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await createCityOperation.execute({});
                } catch (error) {
                    expect(exception.duplicateKeyError).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(CITY_ALREADY_EXISTS);
                    expect(error).to.be.exist();
                }
            });
        });
    });

    describe('#execute', () => {
        context('when occurs error', () => {

            let cityRepository = {}, createCityOperation, logger = {}, exception = {};

            before(() => {

                spy.on(cityRepository, 'create', () => Promise.reject({}));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'internalServer', (msg) => { return new Error(msg); });

                createCityOperation = new CreateCityOperation({ cityRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await createCityOperation.execute({});
                } catch (error) {
                    expect(exception.internalServer).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql('');
                    expect(error).to.be.exist();
                }
            });
        });
    });
});