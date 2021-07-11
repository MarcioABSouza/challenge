const { expect } = require('chai');
const CityRouter = require('src/interfaces/http/presentation/city/CityRouter');

describe('Interfaces :: Http :: Presentation :: User :: CityRouter', () => {
    context('when User routes are requested by Router', () => {
        let cityRouter, container, arrayWithRoutes;

        before(() => {

            arrayWithRoutes = [
                {
                    method: 'post',
                    path: '/',
                    validation: {
                        body: null,
                    },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/name/:city',
                    validation: {
                        params:null
                    },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/state/:state',
                    validation: {
                        params: null,
                    },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/',
                    validation: {},
                    handler: null
                },
                {
                    method: 'delete',
                    path: '/cep/:cep',
                    validation: {
                        params: null,
                    },
                    handler: null
                }
            ];
            container = {
                cradle: {
                    citySchema:{
                        create: null, 
                        byCityName:null, 
                        byCityState:null, 
                        getAll: null, 
                        byCep: null
                    },
                    cityController:{
                        create: null,
                        get: null,
                        getAll: null,
                        delete: null,
                    }
                }
            };
            cityRouter = CityRouter({container});
        });

        it('return an array with routes data', async () => {
            expect(cityRouter).to.deep.equal(arrayWithRoutes);
        });
    });
});