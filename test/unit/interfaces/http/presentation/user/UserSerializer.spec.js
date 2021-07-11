const { expect } = require('chai');
const UserSerializer = require('src/interfaces/http/presentation/user/UserSerializer');

describe('Interfaces :: Http :: Presentation :: User :: UserSerializer', () => {
    describe('#create', () => {
        context('when serialize a created user', () => {

            let userSerializer, UserSerialized, userFromDatabase;

            before(() => {
                userFromDatabase = {
                    id: 1,
                    name: 'Michelle',
                    age: 10,
                    city: 'Pelotas',
                    birth_date: '10-10-2020',
                    email: 'any@any.com',
                    gender: 'M',
                    randomField: 'any'
                };

                UserSerialized = { id: 1, name: 'Michelle', age: 10, city: 'Pelotas', birth_date: '10-10-2020', email: 'any@any.com', gender: 'M' };
                userSerializer = UserSerializer();
            });

            it('returns user serialized fields ', () => {

                const response = userSerializer.create(userFromDatabase);
                expect(response).to.deep.equal(UserSerialized);
            });
        });
    });

    describe('#get', () => {
        context('when serialize a requested user', () => {

            let userSerializer, UserSerialized, userFromDatabase;

            before(() => {
                userFromDatabase = [{
                    id: 1,
                    name: 'Michelle',
                    age: 10,
                    city: 'Pelotas',
                    birth_date: '10-10-2020',
                    email: 'any@any.com',
                    gender: 'M',
                    randomField: 'any'
                }];

                UserSerialized = [{ id: 1, name: 'Michelle', age: 10, city: 'Pelotas', birth_date: '10-10-2020', email: 'any@any.com', gender: 'M' }];
                userSerializer = UserSerializer();
            });

            it('returns user serialized fields ', () => {

                const response = userSerializer.get(userFromDatabase);
                expect(response).to.deep.equal(UserSerialized);
            });
        });
    });

    describe('#getAll', () => {
        context('when serialize a requested users', () => {

            let userSerializer, UserSerialized, userFromDatabase;

            before(() => {
                userFromDatabase = [{
                    id: 1,
                    name: 'Michelle',
                    age: 10,
                    city: 'Pelotas',
                    birth_date: '10-10-2020',
                    email: 'any@any.com',
                    gender: 'M',
                    randomField: 'any'
                }];

                UserSerialized = [{ id: 1, name: 'Michelle', age: 10, city: 'Pelotas', birth_date: '10-10-2020', gender: 'M' }];
                userSerializer = UserSerializer();
            });

            it('returns user serialized fields ', () => {

                const response = userSerializer.getAll(userFromDatabase);
                expect(response).to.deep.equal(UserSerialized);
            });
        });
    });

    describe('#update', () => {
        context('when serialize a updated user', () => {

            let userSerializer, UserSerialized, userFromDatabase;

            before(() => {
                userFromDatabase = {
                    id: 1,
                    name: 'Michelle',
                    last_name:'Luppi',
                    age: 10,
                    city: 'Pelotas',
                    birth_date: '10-10-2020',
                    email: 'any@any.com',
                    gender: 'M',
                    randomField: 'any'
                };

                UserSerialized = { id: 1, name: 'Michelle', last_name:'Luppi',  email: 'any@any.com'};
                userSerializer = UserSerializer();
            });

            it('returns user serialized fields ', () => {

                const response = userSerializer.update(userFromDatabase);
                expect(response).to.deep.equal(UserSerialized);
            });
        });
    });
});