module.exports = () => ({
    create: ({ id, city, state, cep }) => {
        return { id, city, state, cep };
    },

    get: (cities) => {
        return cities.map(({ id, city, state, cep }) => {
            return { id, city, state, cep };
        });
    },

    getAll: (cities) => {
        return cities.map(({ id, city, state, cep }) => {
            return { id, city, state, cep };
        });
    }
});
