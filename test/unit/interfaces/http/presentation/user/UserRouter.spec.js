const { expect } = require('chai');
const UserRouter = require('src/interfaces/http/presentation/user/UserRouter');

describe('Interfaces :: Http :: Presentation :: User :: UserRouter', () => {
    context('when User routes are requested by Router', () => {
        let userRouter, container, arrayWithRoutes;

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
                    method: 'patch',
                    path: '/id/:id',
                    validation: {
                        body: null,
                        params:null
                    },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/id/:id',
                    validation: {
                        params: null,
                    },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/name/:name',
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
                    path: '/id/:id',
                    validation: {
                        params: null,
                    },
                    handler: null
                }
            ];
            container = {
                cradle: {
                    userSchema:{
                        create: null, 
                        update: null, 
                        byId:null, 
                        byName:null, 
                        getAll: null
                    },
                    userController:{
                        create: null,
                        update: null,
                        get: null,
                        getAll: null,
                        delete: null,
                    }
                }
            };
            userRouter = UserRouter({container});
        });

        it('return an array with routes data', async () => {
            expect(userRouter).to.deep.equal(arrayWithRoutes);
        });
    });
});