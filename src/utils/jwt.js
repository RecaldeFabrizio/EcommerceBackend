const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = 'Ecommer'


const generateToken = (user) =>{
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn: '1d'})
    return token
}


const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader) {
        return res.status(401).send({status: 'error', error: 'No authorized'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, JWT_PRIVATE_KEY, (error, Credential) =>{
        if(error) return res.status(403).send({
            status: 'error',
            error: 'No authorized'
        })
        req.user = Credential.user
        next()
    })
}


module.exports = {
    generateToken,
    authToken
}
