class UserRepository {
    constructor({ userModel }) {
        this.userModel = userModel;
    }

    async create(data) {
        
        return await this.userModel.create(data);
    }
}

module.exports = UserRepository;
