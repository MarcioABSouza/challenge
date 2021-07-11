const { expect, spy } = require('chai');
const UserController = require('src/interfaces/http/presentation/user/UserController');

describe('Interfaces :: Http :: Presentation :: User :: UserController', () => {

    describe('#Create', () => {
        context('when an user was created successfully', () => {

            let userController, ctx, opts, userSerialized, userFromDatabase;

            before(() => {

                userSerialized = { any: 'any' };
                userFromDatabase = { another: 'any' };

                opts = {
                    createUserOperation: {
                        execute: () => Promise.resolve(userFromDatabase)
                    },
                    userSerializer: {
                        create: () => (userSerialized)
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
                            json: () => (userSerialized)
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.createUserOperation, 'execute');
                spy.on(opts.userSerializer, 'create');
                spy.on(ctx.res, 'status');
            });

            it(' returns user', async () => {

                const response = await userController.create(ctx);
                expect(opts.createUserOperation.execute).to.have.been.called.once.with.exactly(ctx.body);
                expect(opts.userSerializer.create).to.have.been.called.once.with.exactly(userFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('created');
                expect(response).to.deep.equal(userSerialized);

            });
        });
    });

    describe('#Get', () => {
        context('when get user successfully', () => {

            let userController, ctx, opts, userSerialized, userFromDatabase;

            before(() => {

                userSerialized = { any: 'any' };
                userFromDatabase = { another: 'any' };

                opts = {
                    getUserOperation: {
                        get: () => Promise.resolve(userFromDatabase)
                    },
                    userSerializer: {
                        get: () => (userSerialized)
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
                            json: () => (userSerialized)
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.getUserOperation, 'get');
                spy.on(opts.userSerializer, 'get');
                spy.on(ctx.res, 'status');
            });

            it(' returns user', async () => {

                const response = await userController.get(ctx);
                expect(opts.getUserOperation.get).to.have.been.called.once.with.exactly(ctx.params);
                expect(opts.userSerializer.get).to.have.been.called.once.with.exactly(userFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal(userSerialized);

            });
        });
    });

    describe('#GetAll', () => {
        context('when get users successfully', () => {

            let userController, ctx, opts, userSerialized, userFromDatabase;

            before(() => {

                userSerialized = { any: 'any' };
                userFromDatabase = { another: 'any' };

                opts = {
                    getUserOperation: {
                        getAll: () => Promise.resolve(userFromDatabase)
                    },
                    userSerializer: {
                        getAll: () => (userSerialized)
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
                            json: () => (userSerialized)
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.getUserOperation, 'getAll');
                spy.on(opts.userSerializer, 'getAll');
                spy.on(ctx.res, 'status');
            });

            it(' returns user', async () => {

                const response = await userController.getAll(ctx);
                expect(opts.getUserOperation.getAll).to.have.been.called.once.with.exactly();
                expect(opts.userSerializer.getAll).to.have.been.called.once.with.exactly(userFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal(userSerialized);
            });
        });
    });

    describe('#Update', () => {
        context('when update user successfully', () => {

            let userController, ctx, opts, userSerialized, userFromDatabase;

            before(() => {

                userSerialized = { any: 'any' };
                userFromDatabase = { another: 'any' };

                opts = {
                    updateUserOperation: {
                        execute: () => Promise.resolve(userFromDatabase)
                    },
                    userSerializer: {
                        update: () => (userSerialized)
                    },
                    httpConstants: {
                        HttpCode: ({
                            OK: 'ok'
                        })
                    },
                };

                ctx = {
                    body: { name: 'any', last_name: 'any' },
                    params: { id: '0' },
                    res: {
                        status: () => ({
                            json: () => (userSerialized)
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.updateUserOperation, 'execute');
                spy.on(opts.userSerializer, 'update');
                spy.on(ctx.res, 'status');
            });

            it(' returns user', async () => {

                const response = await userController.update(ctx);
                expect(opts.updateUserOperation.execute).to.have.been.called.once.with.exactly({ id: '0', name: 'any', last_name: 'any' });
                expect(opts.userSerializer.update).to.have.been.called.once.with.exactly(userFromDatabase);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal(userSerialized);
            });
        });
    });

    describe('#Delete', () => {
        context('when celete user successfully', () => {

            let userController, ctx, opts, userFromDatabase;

            before(() => {
                userFromDatabase = { another: 'any' };

                opts = {
                    deleteUserOperation: {
                        execute: () => Promise.resolve(userFromDatabase)
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

                userController = UserController(opts);

                spy.on(opts.deleteUserOperation, 'execute');
                spy.on(ctx.res, 'status');
            });

            it(' returns user', async () => {

                const response = await userController.delete(ctx);
                expect(opts.deleteUserOperation.execute).to.have.been.called.once.with.exactly(ctx.params);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal();
            });
        });
    });
});
