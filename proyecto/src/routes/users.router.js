const { Router } = require('express')
const usersController = require('../controllers/users.controller.js')
const { authentication } = require('../middleware/authentication.js')

const router = Router()

router.get('/', authentication,usersController.getAllUsers)
router.get('/:uid',usersController.getUser)
router.post('/', usersController.createUser)
router.put('/:uid',usersController.updateUser)
router.delete('/:uid',usersController.deleteUser)


module.exports = router
