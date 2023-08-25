const jwt = require('jsonwebtoken')

exports.authentication = (req, res, next)=>{
    console.log(req.headers)
    const token = req.cookies['coderCookie']
    console.log('token',token)
    if (!token) return res.status(401).send({status: 'error',error: 'not token provided'})

    jwt.verify(token, 'tokenSecretJWT', (err, decoded) => {
        if (err) {
            return res.status(401).send({status: 'error', error: 'invalid token provided'})
        }
        console.log(decoded)
        req.user = decoded
    })
    next()
}
