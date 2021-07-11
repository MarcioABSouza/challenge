const { expect, spy } = require('chai');
const UpdateUserOperation = require('src/app/operations/user/UpdateUserOperation');
const { USER_NOT_FOUND } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: User :: UpdateUserOperation', () => {

    describe('#execute', () => {
        context('when runs with success', () => {

            let updateUserOperation, userRepository = {}, logger = {},
                userToBeUpdated = { any: 'any', another: 'another' }, updatedUser = { any: 'updated' };

            before(() => {

                spy.on(userRepository, 'update', () => Promise.resolve(updatedUser));
                spy.on(logger, 'error', () => null);

                updateUserOperation = new UpdateUserOperation({ userRepository, logger });
            });

            it('returns deleted user', async () => {
                const response = await updateUserOperation.execute(userToBeUpdated);
                expect(userRepository.update).to.be.called.once.with.exactly(userToBeUpdated);
                expect(response).to.be.deep.equals(updatedUser);

            });
        });
    });

    describe('#execute', () => {
        context('when user does not exists', () => {

            let userRepository = {}, updateUserOperation, logger = {}, exception = {},
                userToBeUpdated = { any: 'any', another: 'another' };

            before(() => {

                spy.on(userRepository, 'update', () => Promise.resolve(null));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'notFound', (msg) => { return new Error(msg); });

                updateUserOperation = new UpdateUserOperation({ userRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await updateUserOperation.execute(userToBeUpdated);
                } catch (error) {
                    expect(userRepository.update).to.be.called.once.with.exactly(userToBeUpdated);
                    expect(exception.notFound).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(USER_NOT_FOUND);
                    expect(error).to.be.exist();
                }
            });
        });
    });
});