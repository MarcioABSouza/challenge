const { expect, spy } = require('chai');
const UserModel = require('src/infra/database/mongo/models/UserModel');
const mongoose = require('mongoose');

describe('Infra :: Database :: Mongo :: Models :: UserModel', () => {

    const config = {
        db: {
            collections: {
                users: {
                    name: 'users'
                }
            }
        }
    };

    afterEach(function () {
        mongoose.models = {};
    });

    context('Initializes mongoose schema', () => {
        let providerConnection;

        before(() => {
            providerConnection = {
                connection: {
                    model: (name, schema) => ({ name, schema })
                }
            };
            spy.on(providerConnection.connection, 'model');

        });

        it('returns model name and schema', () => {
            const { name, schema } = UserModel({
                providerConnection,
                config
            });

            expect(name).to.be.equal('users');
            expect(schema).to.be.exist();
            expect(providerConnection.connection.model).to.be.called.once();
        });
    });

    context('when fields are ok', () => {
        let userModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            userModel = UserModel({ providerConnection: ProviderConnection, config });

            data = { name: 'any', last_name: 'any', email: '000', city: 'any', age: 20, birth_date: '10-04-1980' };
        });

        it('returns validate success', () => {
            const model = new userModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.undefined();
        });
    });

    context('when some field is incorrect or missing', () => {
        let userModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            userModel = UserModel({ providerConnection: ProviderConnection, config });

            data = { any: 'any' };
        });

        it('returns error', () => {
            const model = new userModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.exist();
        });
    });
});