function auth(req, res, next) {
    console.log('auth', req.session)
    if(req.session?.user?.email !=='fabrizio.recalde98@gmail.com' || !req.session?.user?.admin === 'admin'){
        return res.status(401).send('Error de autenticacion')
    }
    next()
}

module.exports = {auth}
