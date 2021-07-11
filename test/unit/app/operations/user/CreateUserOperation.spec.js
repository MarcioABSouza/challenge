const { expect, spy } = require('chai');
const CreateUserOperation = require('src/app/operations/user/CreateUserOperation');
const { EMAIL_ALREADY_EXIST } = require('src/domain/enums/MessageErrors');


describe('App :: Operations :: User :: CreateUserOperation', () => {

    describe('#execute', () => {
        context('when runs with succes', () => {

            let createUserOperation, userRepository = {}, logger = {}, userFromDatabase, userTobeCreated = { any: 'any' };

            before(() => {

                spy.on(userRepository, 'create', () => Promise.resolve(userFromDatabase));
                spy.on(logger, 'error', () => null);

                createUserOperation = new CreateUserOperation({ userRepository, logger });
            });

            it('returns created user', async () => {
                const response = await createUserOperation.execute(userTobeCreated);
                expect(userRepository.create).to.be.called.once.with.exactly(userTobeCreated);
                expect(response).to.be.deep.equals(userFromDatabase);

            });
        });
    });

    describe('#execute', () => {
        context('when user already exists', () => {

            let userRepository = {}, createUserOperation, logger = {}, exception = {};

            before(() => {

                spy.on(userRepository, 'create', () => Promise.reject({ code: 11000 }));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'duplicateKeyError', (msg) => { return new Error(msg); });

                createUserOperation = new CreateUserOperation({ userRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await createUserOperation.execute({});
                } catch (error) {
                    expect(exception.duplicateKeyError).to.have.been.called();
                    expect(logger.error).to.have.been.called();
                    expect(error.message).to.be.eql(EMAIL_ALREADY_EXIST);
                    expect(error).to.be.exist();
                }
            });
        });
    });

    describe('#execute', () => {
        context('when occurs error', () => {

            let userRepository = {}, createUserOperation, logger = {}, exception = {};

            before(() => {

                spy.on(userRepository, 'create', () => Promise.reject({}));
                spy.on(logger, 'error', () => null);
                spy.on(exception, 'internalServer', (msg) => { return new Error(msg); });

                createUserOperation = new CreateUserOperation({ userRepository, logger, exception });

            });

            it('throws error', async () => {

                try {
                    await createUserOperation.execute({});
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