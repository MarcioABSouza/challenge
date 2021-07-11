const { expect } = require('chai');
const CitySchema = require('src/interfaces/http/presentation/city/CitySchema');

describe('Interfaces :: Http :: Presentation :: city :: citySchema', () => {
    context('when fields for create is ok', () => {
        let citySchema;

        before(() => {
            citySchema = CitySchema();
        });

        it('returns no error', async () => {
            const payload = { city: 'Pelotas', state: 'RS', cep: '19098956' };
            const { error, value } = citySchema.create.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });

    context('when fields for byCityName is ok', () => {
        let citySchema;

        before(() => {
            citySchema = CitySchema();
        });

        it('returns no error', async () => {
            const payload = { city: 'Pelotas' };
            const { error, value } = citySchema.byCityName.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });

    context('when fields for byCityState is ok', () => {
        let citySchema;

        before(() => {
            citySchema = CitySchema();
        });

        it('returns no error', async () => {
            const payload = { state: 'RS' };
            const { error, value } = citySchema.byCityState.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });

    context('when fields for update is ok', () => {
        let citySchema;

        before(() => {
            citySchema = CitySchema();
        });

        it('returns no error', async () => {
            const payload = { cep: '13569856'};
            const { error, value } = citySchema.byCep.validate(payload);
            expect(error).to.be.undefined();
            expect(value).to.be.exist();
        });
    });
});