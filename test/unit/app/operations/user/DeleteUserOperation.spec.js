const { expect, spy } = require('chai');
const DeleteUserOperation = require('src/app/operations/user/DeleteUserOperation');
const { USER_NOT_FOUND } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: User :: DeleteUserOperation', () => {

    describe('#execute', () => {
        context('when runs with success', () => {

            let deleteUserOperation, userRepository = {}, logger = {}, userToBeDeleted = { any: 'any' };

            before(() => {

                spy.on(userRepository, 'delete', () => Promise.resolve(userToBeDeleted));
                spy.on(logger, 'error', () => null);

                deleteUserOperation = new DeleteUserOperation({ userRepository, logger });
            });

            it('returns deleted user', async () => {
                const response = await deleteUserOperation.execute(userToBeDeleted);
                expect(userRepository.delete).to.be.called.once.with.exactly(userToBeDeleted);
                expect(response).to.be.deep.equals(userToBeDeleted);

            });
        });
    });

    describe('#execute', () => {
        context('when user does not exists', () => {

            let userRepository = {}, deleteUserOperation, logger = {}, exception = {}, userToBeDeleted = { cep: 'any' };

            before(() => {

                spy.on(userRepository, 'delete', () => Promise.resolve(null));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                deleteUserOperation = new DeleteUserOperation({ userRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await deleteUserOperation.execute(userToBeDeleted);
                } catch (error) {
                    expect(userRepository.delete).to.be.called.once.with.exactly(userToBeDeleted);
                    expect(exception.notFound).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(USER_NOT_FOUND);
                    expect(error).to.be.exist();
                }
            });
        });
    });
});