const { expect, spy } = require('chai');
const CityController = require('src/interfaces/http/presentation/city/CityController');

describe('Interfaces :: Http :: Presentation :: City :: CityController', () => {
    describe('#Create', () => {
        context('when an city was created successfully', () => {

            let cityController, ctx, opts, citySerialized, cityFromDatabase;

            before(() => {

                citySerialized = { any: 'any' };
                cityFromDatabase = { another: 'any' };

                opts = {
                    createCityOperation: {
                        execute: () => Promise.resolve(cityFromDatabase)
                    },
                    citySerializer: {
                        create: () => (citySerialized)
                    },
                    httpConstants: {
                        HttpCode: ({
                            CREATED: 'created'
                        })
                    },
                };

                ctx = {
                    body: {},
                    res: {
                        status: () => ({
                            json: () => (citySerialized)
                        })
                    },
                };

                cityController = CityController(opts);

                spy.on(opts.createCityOperation, 'execute');
                spy.on(opts.citySerializer, 'create');
                spy.on(ctx.res, 'status');
            });

            it(' returns city', async () => {

                const response = await cityController.create(ctx);
                expect(opts.createCityOperation.execute).to.have.been.called.once.with.exactly(ctx.body);
                expect(opts.citySerializer.create).to.have.been.called.once.with.exactly(cityFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('created');
                expect(response).to.deep.equal(citySerialized);

            });
        });
    });

    describe('#Get', () => {
        context('when get city successfully', () => {

            let cityController, ctx, opts, citySerialized, cityFromDatabase;

            before(() => {

                citySerialized = { any: 'any' };
                cityFromDatabase = { another: 'any' };

                opts = {
                    getCityOperation: {
                        get: () => Promise.resolve(cityFromDatabase)
                    },
                    citySerializer: {
                        get: () => (citySerialized)
                    },
                    httpConstants: {
                        HttpCode: ({
                            OK: 'ok'
                        })
                    },
                };

                ctx = {
                    params: {},
                    res: {
                        status: () => ({
                            json: () => (citySerialized)
                        })
                    },
                };

                cityController = CityController(opts);

                spy.on(opts.getCityOperation, 'get');
                spy.on(opts.citySerializer, 'get');
                spy.on(ctx.res, 'status');
            });

            it(' returns city', async () => {

                const response = await cityController.get(ctx);
                expect(opts.getCityOperation.get).to.have.been.called.once.with.exactly(ctx.params);
                expect(opts.citySerializer.get).to.have.been.called.once.with.exactly(cityFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal(citySerialized);

            });
        });
    });

    describe('#GetAll', () => {
        context('when get citys successfully', () => {

            let cityController, ctx, opts, citySerialized, cityFromDatabase;

            before(() => {

                citySerialized = { any: 'any' };
                cityFromDatabase = { another: 'any' };

                opts = {
                    getCityOperation: {
                        getAll: () => Promise.resolve(cityFromDatabase)
                    },
                    citySerializer: {
                        getAll: () => (citySerialized)
                    },
                    httpConstants: {
                        HttpCode: ({
                            OK: 'ok'
                        })
                    },
                };

                ctx = {
                    res: {
                        status: () => ({
                            json: () => (citySerialized)
                        })
                    },
                };

                cityController = CityController(opts);

                spy.on(opts.getCityOperation, 'getAll');
                spy.on(opts.citySerializer, 'getAll');
                spy.on(ctx.res, 'status');
            });

            it(' returns city', async () => {

                const response = await cityController.getAll(ctx);
                expect(opts.getCityOperation.getAll).to.have.been.called.once.with.exactly();
                expect(opts.citySerializer.getAll).to.have.been.called.once.with.exactly(cityFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal(citySerialized);
            });
        });
    });

    describe('#Delete', () => {
        context('when celete city successfully', () => {

            let cityController, ctx, opts, cityFromDatabase;

            before(() => {
                cityFromDatabase = { another: 'any' };

                opts = {
                    deleteCityOperation: {
                        execute: () => Promise.resolve(cityFromDatabase)
                    },

                    httpConstants: {
                        HttpCode: ({
                            OK: 'ok'
                        })
                    },
                };

                ctx = {
                    params: {},
                    res: {
                        status: () => ({
                            send: () => {}
                        })
                    },
                };

                cityController = CityController(opts);

                spy.on(opts.deleteCityOperation, 'execute');
                spy.on(ctx.res, 'status');
            });

            it(' returns city', async () => {

                const response = await cityController.delete(ctx);
                expect(opts.deleteCityOperation.execute).to.have.been.called.once.with.exactly(ctx.params);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal();
            });
        });
    });
});
