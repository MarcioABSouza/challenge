module.exports = () => ({
    create: ({ id, name, age, city, birth_date, email }) => {
        return { id, name, age, city, birth_date, email };
    },

    get: (users) => {
        return users.map(({ id, name, age, city, birth_date, email }) => {
            return { id, name, age, city, birth_date, email };
        });
    },

    getAll: (users) => {
        return users.map(({ id, name, age, city, birth_date }) => {
            return { id, name, age, city, birth_date };
        });
    },

    update: ({ id, name, last_name, email }) => {
        return { id, name, last_name, email };
    }
});
