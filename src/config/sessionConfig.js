const { create } = require("connect-mongo");
const session = require("express-session");

const sessionConfig = session({
    store: create({
        mongoUrl: 'mongodb+srv://FDR98:Hesoyam123@cluster0.gkja86y.mongodb.net/test',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 100000 * 6000
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
});

module.exports = sessionConfig;