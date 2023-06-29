const { contactModel } = require("../models/contacts.model.js")

class ContactDaoMongo {
    constructor(){
        this.contactModel = contactModel
    }
    get  = async () => this.contactModel.find({})
    create = async (newContact) => this.contactModel.create(newContact) 
}

module.exports = ContactDaoMongo
