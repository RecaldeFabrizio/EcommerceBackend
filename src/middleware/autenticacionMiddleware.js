function auth(req, res, next) {
    console.log('auth',req.session)
    if(req.session?.user?.email === 'admincoder@coder.com' && !req.session?.user?.password === 'admincoder123'){
        return res.status(401).send('Error de autenticación')
    }
    next()
}

module.exports = {
    auth
}

