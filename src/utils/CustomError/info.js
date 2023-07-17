exports.generateUserErrorInfo = (user) => {
    return `One or more properties ware incomplete or not valid.
        listado de requirimientos de propiedades del user:
        * first_name: needs to a String, received ${user.first_name}
        * last_name: needs to a String, received ${user.last_name}
        * email: needs to a String, received ${user.email}`
}
exports.generatePoductErrorInfo = (products) => {
    return `One or more properties ware incomplete or not valid.
        listado de requirimientos de propiedades del pruducto:
        * title: needs to a String, received ${products.title}
        * price: needs to a String, received ${products.price}
        * code: needs to a String, received ${products.code}`
}
