const { 
    ContactDao, 
    ProductDao, 
    UserDao 
} = require("../dao/factory/factory.js")
const ContactRepository = require("../repositories/contacts.repository.js")

const productService = new ProductDao()
const userService = new UserDao()

const contactService = new ContactRepository(new ContactDao())

module.exports = {
    productService,
    userService,
    contactService
}

