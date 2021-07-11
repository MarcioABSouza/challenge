const { expect, spy } = require('chai');
const GetUserOperation = require('src/app/operations/user/GetUserOperation');
const { USER_NOT_FOUND } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: City :: GetUserOperation', () => {

    describe('#get', () => {
        context('when runs with success', () => {

            let getUserOperation, userRepository = {}, logger = {}, userRequested = { name: 'any' }, userFromDatabase = { user: 'any' };

            before(() => {

                spy.on(userRepository, 'get', () => Promise.resolve([userFromDatabase]));
                spy.on(logger, 'error', () => null);

                getUserOperation = new GetUserOperation({ userRepository, logger });
            });

            it('returns requested user', async () => {
                const response = await getUserOperation.get(userRequested);
                expect(userRepository.get).to.be.called.once.with.exactly(userRequested);
                expect(response).to.be.deep.equals([userFromDatabase]);

            });
        });
    });

    describe('#get', () => {
        context('when does not exists', () => {

            let userRepository = {}, getUserOperation, logger = {}, exception = {}, userRequested = { name: 'any' };

            before(() => {

                spy.on(userRepository, 'get', () => Promise.resolve([]));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                getUserOperation = new GetUserOperation({ userRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await getUserOperation.get(userRequested);
                } catch (error) {
                    expect(userRepository.get).to.be.called.once.with.exactly(userRequested);
                    expect(exception.notFound).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(USER_NOT_FOUND);
                    expect(error).to.be.exist();
                }
            });
        });
    });

    describe('#getAll', () => {
        context('when runs with success', () => {

            let userRepository = {}, getUserOperation, logger = {}, exception = {}, usersFromDatabase = [{ any: 'any' }, { any: 'any' }];

            before(() => {

                spy.on(userRepository, 'getAll', () => Promise.resolve(usersFromDatabase));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                getUserOperation = new GetUserOperation({ userRepository, logger, exception });

            });

            it('returns all cities', async () => {
                const response = await getUserOperation.getAll();
                expect(userRepository.getAll).to.be.called.once.with.exactly();
                expect(response).to.be.deep.equals(usersFromDatabase);
                expect(exception.notFound).to.have.not.been.called();
                expect(logger.error).to.have.not.been.called();
            });
        });
    });
});