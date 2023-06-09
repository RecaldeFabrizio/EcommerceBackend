const { Router } = require('express')
const { auth } = require('../middleware/autenticacionMiddleware.js')
const {
    getUsers, 
    createUsers, 
    updateUsers, 
    deleteUsers
} = require('../controllers/users.controller.js')

const router = Router();

router.get('/',  
    // auth, 
    getUsers
)

router.post('/', createUsers)

router.put('/:uid', updateUsers)


router.delete('/:uid', deleteUsers)

module.exports = router
