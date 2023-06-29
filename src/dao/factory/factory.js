const config = require('../../config/objetConfig.js')
let UserDao
let ProductDao
let ContactDao

switch (config.persistence) { 
    case 'MONGO':
        
        config.connectDB()
        const ProductDaoMongo = require('../mongo/product.mongo.js')
        const UserDaoMongo = require('../mongo/user.mongo.js')
        const ContactDaoMongo = require('../mongo/contact.mongo.js')

        UserDao    = UserDaoMongo
        ProductDao = ProductDaoMongo
        ContactDao = ContactDaoMongo
        break;
    case 'FILE':
        const ProductDaoFile = require('../file/product.file.js')
        const UserDaoFile = require('../file/user.file.js')
        
        UserDao    = UserDaoFile
        ProductDao = ProductDaoFile
        break;
    case 'MEMORY':
        const ProductDaoMemory = require('../memoria/product.memory.js')
        const UserDaoMemory = require('../memoria/user.memory.js')
        
        UserDao    = UserDaoMemory
        ProductDao = ProductDaoMemory
        break;

    default:
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    ContactDao
}
