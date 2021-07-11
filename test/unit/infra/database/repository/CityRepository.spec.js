const { expect, spy } = require('chai');
const CityRepository = require('src/infra/database/repository/CityRepository');

describe('Infra :: Database :: Repository :: CityRepository', () => {

    describe('#Create', () => {
        context('When city is created with success', () => {
            let cityToBeCreated, cityFromDatabase, cityRepository, cityModel;

            beforeEach(() => {
                cityFromDatabase = { any: 'any' }, cityToBeCreated = { name: 'any' };

                cityModel = {
                    create: () => Promise.resolve(cityFromDatabase)
                };

                spy.on(cityModel, 'create');
                cityRepository = new CityRepository({ cityModel });
            });

            it(' returns city data from database', async () => {

                const response = await cityRepository.create(cityToBeCreated);
                expect(cityModel.create).to.be.called.once.with.exactly(cityToBeCreated);
                expect(response).to.deep.equal(cityFromDatabase);
            });
        });

        context('when ocucurs an error', () => {
            let cityRepository, cityModel, cityToBeCreated;
            before(() => {

                cityToBeCreated = { name: 'Pelotas' };

                cityModel = {
                    create: () => Promise.reject(new Error('test'))
                };

                cityRepository = new CityRepository({ cityModel });
                spy.on(cityModel, 'create');

            });

            it('throws error', async () => {
                try {
                    await cityRepository.create(cityToBeCreated);
                } catch (error) {
                    expect(error).to.be.exist();
                    expect(error.message).to.be.eql('test');
                    expect(cityModel.create).to.be.called.once();
                }
            });
        });
    });

    describe('#Get', () => {
        context('When executes ok', () => {
            let userRequested, cityFromDatabase, cityRepository, cityModel;

            beforeEach(() => {
                cityFromDatabase = { any: 'any' }, userRequested = { name: 'any' };

                cityModel = {
                    find: () => Promise.resolve(cityFromDatabase)
                };

                spy.on(cityModel, 'find');
                cityRepository = new CityRepository({ cityModel });
            });

            it(' returns city data from database', async () => {

                const response = await cityRepository.get(userRequested);
                expect(cityModel.find).to.be.called.once.with.exactly(userRequested);
                expect(response).to.deep.equal(cityFromDatabase);
            });
        });
    });

    describe('#GetAll', () => {
        context('When executes ok', () => {
            let usersFromDatabase, cityRepository, cityModel;

            beforeEach(() => {
                usersFromDatabase = [{ any: 'any' }, { any: 'any' }];

                cityModel = {
                    find: () => Promise.resolve(usersFromDatabase)
                };

                spy.on(cityModel, 'find');
                cityRepository = new CityRepository({ cityModel });
            });

            it(' returns users data from database', async () => {

                const response = await cityRepository.getAll();
                expect(cityModel.find).to.be.called.once.with.exactly({});
                expect(response).to.deep.equal(usersFromDatabase);
            });
        });
    });

    describe('#Delete', () => {
        context('When executes ok', () => {
            let cityToBeDeleted, cityFromDatabase, cityRepository, cityModel;

            beforeEach(() => {
                cityFromDatabase = { any: 'any' }, cityToBeDeleted = { name: 'any' };

                cityModel = {
                    findOneAndDelete: () => Promise.resolve(cityFromDatabase)
                };

                spy.on(cityModel, 'findOneAndDelete');
                cityRepository = new CityRepository({ cityModel });
            });

            it(' returns city deleted from database', async () => {

                const response = await cityRepository.delete(cityToBeDeleted);
                expect(cityModel.findOneAndDelete).to.be.called.once.with.exactly(cityToBeDeleted);
                expect(response).to.deep.equal(cityFromDatabase);
            });
        });
    });
});