const UserDaoMongo    = require("../dao/Mongo/user.mongo.js");
const ProductDaoMongo = require('../dao/mongo/product.mongo.js')

const userService = new UserDaoMongo()
const productService = new ProductDaoMongo()

module.exports = {
    userService,
    productService
}
