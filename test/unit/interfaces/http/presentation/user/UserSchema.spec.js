const { expect } = require('chai');
const UserSchema = require('src/interfaces/http/presentation/user/UserSchema');

describe('Interfaces :: Http :: Presentation :: user :: userSchema', () => {
    context('when fields for create is ok', () => {
        let userSchema;

        before(() => {
            userSchema = UserSchema();
        });

        it('returns no error', async () => {
            const payload = { name: 'Michelle', last_name: 'Luppi', email: 'any@any.com', gender: 'M', age: 20, birth_date: '10-10-1990', city: 'Pelotas' };
            const { error, value } = userSchema.create.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });

    context('when fields for byId is ok', () => {
        let userSchema;

        before(() => {
            userSchema = UserSchema();
        });

        it('returns no error', async () => {
            const payload = { id: '1' };
            const { error, value } = userSchema.byId.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });
    context('when fields for byName is ok', () => {
        let userSchema;

        before(() => {
            userSchema = UserSchema();
        });

        it('returns no error', async () => {
            const payload = { name: 'Michelle'};
            const { error, value } = userSchema.byName.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });

    context('when fields for update is ok', () => {
        let userSchema;

        before(() => {
            userSchema = UserSchema();
        });

        it('returns no error', async () => {
            const payload = { name: 'Michelle', last_name: 'Luppi'};
            const { error, value } = userSchema.update.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });

    context('when fields for delete is ok', () => {
        let userSchema;

        before(() => {
            userSchema = UserSchema();
        });

        it('returns no error', async () => {
            const payload = { id:'1' };
            const { error, value } = userSchema.delete.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });
});