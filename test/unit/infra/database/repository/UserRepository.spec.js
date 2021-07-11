const { expect, spy } = require('chai');
const UserRepository = require('src/infra/database/repository/UserRepository');

describe('Infra :: Database :: Repository :: UserRepository', () => {

    describe('#Create', () => {
        context('When user is created with success', () => {
            let userToBeCreated, userFromDatabase, userRepository, userModel;

            beforeEach(() => {
                userFromDatabase = { any: 'any' }, userToBeCreated = { name: 'any' };

                userModel = {
                    create: () => Promise.resolve(userFromDatabase)
                };

                spy.on(userModel, 'create');
                userRepository = new UserRepository({ userModel });
            });

            it(' returns user data from database', async () => {

                const response = await userRepository.create(userToBeCreated);
                expect(userModel.create).to.be.called.once.with.exactly(userToBeCreated);
                expect(response).to.deep.equal(userFromDatabase);
            });
        });

        context('when ocucurs an error', () => {
            let userRepository, userModel, userToBeCreated;
            before(() => {

                userToBeCreated = { name: 'Linus' };

                userModel = {
                    create: () => Promise.reject(new Error('test'))
                };

                userRepository = new UserRepository({ userModel });
                spy.on(userModel, 'create');

            });

            it('throws error', async () => {
                try {
                    await userRepository.create(userToBeCreated);
                } catch (error) {
                    expect(error).to.be.exist();
                    expect(error.message).to.be.eql('test');
                    expect(userModel.create).to.be.called.once();
                }
            });
        });
    });

    describe('#Get', () => {
        context('When executes ok', () => {
            let userRequested, userFromDatabase, userRepository, userModel;

            beforeEach(() => {
                userFromDatabase = { any: 'any' }, userRequested = { name: 'any' };

                userModel = {
                    find: () => Promise.resolve(userFromDatabase)
                };

                spy.on(userModel, 'find');
                userRepository = new UserRepository({ userModel });
            });

            it(' returns user data from database', async () => {

                const response = await userRepository.get(userRequested);
                expect(userModel.find).to.be.called.once.with.exactly(userRequested);
                expect(response).to.deep.equal(userFromDatabase);
            });
        });
    });

    describe('#GetAll', () => {
        context('When executes ok', () => {
            let usersFromDatabase, userRepository, userModel;

            beforeEach(() => {
                usersFromDatabase = [{ any: 'any' }, { any: 'any' }];

                userModel = {
                    find: () => Promise.resolve(usersFromDatabase)
                };

                spy.on(userModel, 'find');
                userRepository = new UserRepository({ userModel });
            });

            it(' returns users data from database', async () => {

                const response = await userRepository.getAll();
                expect(userModel.find).to.be.called.once.with.exactly({});
                expect(response).to.deep.equal(usersFromDatabase);
            });
        });
    });

    describe('#Update', () => {
        context('When executes ok', () => {
            let userUpdatedFromDatabase, userToBeUpdated, userRepository, userModel;

            beforeEach(() => {
                userUpdatedFromDatabase = { any: 'any' };
                userToBeUpdated = { id: 'any', name: 'any', last_name: 'any' };

                userModel = {
                    findOneAndUpdate: () => Promise.resolve(userUpdatedFromDatabase)
                };

                spy.on(userModel, 'findOneAndUpdate');
                userRepository = new UserRepository({ userModel });
            });

            it(' returns user updated data from database', async () => {

                const response = await userRepository.update(userToBeUpdated);
                expect(userModel.findOneAndUpdate).to.be.called.once.with.exactly({ id: 'any' }, { name: 'any', last_name: 'any' }, { new: true });
                expect(response).to.deep.equal(userUpdatedFromDatabase);
            });
        });
    });

    describe('#Delete', () => {
        context('When executes ok', () => {
            let userToBeDeleted, userFromDatabase, userRepository, userModel;

            beforeEach(() => {
                userFromDatabase = { any: 'any' }, userToBeDeleted = { name: 'any' };

                userModel = {
                    findOneAndDelete: () => Promise.resolve(userFromDatabase)
                };

                spy.on(userModel, 'findOneAndDelete');
                userRepository = new UserRepository({ userModel });
            });

            it(' returns user deleted from database', async () => {

                const response = await userRepository.delete(userToBeDeleted);
                expect(userModel.findOneAndDelete).to.be.called.once.with.exactly(userToBeDeleted);
                expect(response).to.deep.equal(userFromDatabase);
            });
        });
    });
});