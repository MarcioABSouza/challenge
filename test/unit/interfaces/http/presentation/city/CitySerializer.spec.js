const { expect } = require('chai');
const CitySerializer = require('src/interfaces/http/presentation/city/CitySerializer');

describe('Interfaces :: Http :: Presentation :: City :: CitySerializer', () => {
    describe('#create', () => {
        context('when serialize a created city', () => {

            let citySerializer, citySerialized, cityFromDatabase;

            before(() => {
                cityFromDatabase = { id: 1, city: 'Pelotas', state: 'RS', cep: '12365895', randomField: 'any' };
                citySerialized = { id: 1, city: 'Pelotas', state: 'RS', cep: '12365895' };
                citySerializer = CitySerializer();
            });

            it('returns city serialized fields ', () => {

                const response = citySerializer.create(cityFromDatabase);
                expect(response).to.deep.equal(citySerialized);
            });
        });
    });

    describe('#get', () => {
        context('when serialize a requested city', () => {

            let citySerializer, citySerialized, cityFromDatabase;

            before(() => {
                cityFromDatabase = [{ id: 1, city: 'Pelotas', state: 'RS', cep: '12365895', randomField: 'any' }];
                citySerialized = [{ id: 1, city: 'Pelotas', state: 'RS', cep: '12365895' }];
                citySerializer = CitySerializer();
            });

            it('returns city serialized fields ', () => {

                const response = citySerializer.get(cityFromDatabase);
                expect(response).to.deep.equal(citySerialized);
            });
        });
    });

    describe('#getAll', () => {
        context('when serialize a requested city', () => {

            let citySerializer, citySerialized, cityFromDatabase;

            before(() => {
                cityFromDatabase = [
                    { id: 1, city: 'Pelotas', state: 'RS', cep: '12365895', randomField: 'any' },
                    { id: 2, city: 'Rio Grande', state: 'RS', cep: '12365895', randomField: 'any' }
                ];
                citySerialized = [
                    { id: 1, city: 'Pelotas', state: 'RS', cep: '12365895' },
                    { id: 2, city: 'Rio Grande', state: 'RS', cep: '12365895' }
                ];
                citySerializer = CitySerializer();
            });

            it('returns city serialized fields ', () => {

                const response = citySerializer.getAll(cityFromDatabase);
                expect(response).to.deep.equal(citySerialized);
            });
        });
    });
});