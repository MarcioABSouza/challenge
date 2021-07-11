module.exports = () => ({
    create: ({ id, name, age, city, birth_date, email, gender }) => {
        return { id, name, age, city, birth_date, email, gender };
    },

    get: (users) => {
        return users.map(({ id, name, age, city, birth_date, email, gender }) => {
            return { id, name, age, city, birth_date, email, gender };
        });
    },

    getAll: (users) => {
        return users.map(({ id, name, age, city, birth_date, gender }) => {
            return { id, name, age, city, birth_date, gender };
        });
    },

    update: ({ id, name, last_name, email }) => {
        return { id, name, last_name, email };
    }
});
