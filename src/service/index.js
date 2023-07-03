const { 
    ContactDao, 
    ProductDao, 
    UserDao 
} = require("../dao/factory/factory.js")
const ContactRepository = require("../repositories/contacts.repository.js")
const ProductRepository = require("../repositories/product.repository.js")

//const productService = new ProductDao()
const userService = new UserDao()

const contactService = new ContactRepository(new ContactDao())
const productService = new ProductRepository(new ProductDao())

module.exports = {
    productService,
    userService,
    contactService
}

