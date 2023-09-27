const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Docs Ecommerce',
            description: 'Documentos de User, Product y Cart'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = specs;