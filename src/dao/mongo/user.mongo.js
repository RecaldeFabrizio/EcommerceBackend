const { userModel } = require("../models/user.model.js")


class UserDaoMongo { 
    constructor() {
    
        this.userModel = userModel
    }

    get = async(limit = 10, page = 1) => await this.userModel.find({}, /* { limit, page, lean: true } */);

    getById = async (uid) => await this.userModel.findOne({_id: uid})

    create = async (newUser)=> await this.userModel.create(newUser)
    
    update = async (uid, userUpdate) => await this.userModel.findOneAndUpdate({_id: uid}, userUpdate)
    
    delete = async(uid) => await this.userModel.findOneAndDelete({_id: uid})
    
}

module.exports = UserDaoMongo
