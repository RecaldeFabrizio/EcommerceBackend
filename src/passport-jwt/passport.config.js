const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const objectConfig = require('../config/objetConfig.js')

const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt

const cookieExtractor = req => {
    let token = null
    console.log(req.cookies)
    if(req && req.cookies){
        token = req.cookies['coderCookieToken'] 
    }
    
    console.log(token)
    
    return token
}

const configStrategy = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'palabraJwtSecreto'
}

const initPassport= ()=>{
    passport.use('jwt', new JWTStrategy(configStrategy, async (jwt_payload, done)=>{
        try {
                
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = {
    initPassport
}

