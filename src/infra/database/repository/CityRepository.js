class UserRepository {
    constructor({ cityModel }) {
        this.cityModel = cityModel;
    }

    async create(data) {

        return await this.cityModel.create(data);
    }

    async get(query) {

        return await this.cityModel.find(query);
    }

    async getAll() {

        return await this.cityModel.find({});
    }

    async delete(id) {

        return await this.cityModel.findOneAndDelete(id);
    }
}

module.exports = UserRepository;