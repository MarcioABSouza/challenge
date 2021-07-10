class UserRepository {
    constructor({ userModel }) {
        this.userModel = userModel;
    }

    async create(data) {

        return await this.userModel.create(data);
    }

    async get(query) {

        return await this.userModel.find(query);
    }

    async getAll() {

        return await this.userModel.find({});
    }

    async update({ id, name, last_name }) {

        return await this.userModel.findOneAndUpdate({ id: id }, { name, last_name }, { new: true });
    }

    async delete(id) {

        return await this.userModel.findOneAndDelete(id);
    }
}

module.exports = UserRepository;
