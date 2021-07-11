const { expect, spy } = require('chai');
const CityModel = require('src/infra/database/mongo/models/CityModel');
const mongoose = require('mongoose');

describe('Infra :: Database :: Mongo :: Models :: CityModel', () => {

    const config = {
        db: {
            collections: {
                cities: {
                    name: 'cities'
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
            const { name, schema } = CityModel({
                providerConnection,
                config
            });

            expect(name).to.be.equal('cities');
            expect(schema).to.be.exist();
            expect(providerConnection.connection.model).to.be.called.once();
        });
    });

    context('when fields are ok', () => {
        let cityModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            cityModel = CityModel({ providerConnection: ProviderConnection, config });

            data = { city: 'any', state: 'any', cep: '000' };
        });

        it('returns validate success', () => {
            const model = new cityModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.undefined();
        });
    });

    context('when some field is incorrect or missing', () => {
        let cityModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            cityModel = CityModel({ providerConnection: ProviderConnection, config });

            data = { city: null, state: 0 };
        });

        it('returns error', () => {
            const model = new cityModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.exist();
        });
    });
});