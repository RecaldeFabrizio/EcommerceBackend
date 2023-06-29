const { Router } = require('express')
const contactController = require('../controllers/contacts.controller.js')
const router = Router()
router.get('/', contactController.getContacts)
router.post('/', contactController.createContact)
module.exports = router