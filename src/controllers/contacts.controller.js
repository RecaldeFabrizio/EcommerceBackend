const { contactService } = require('../service/index.js')
const { ContactDto } = require('../dto/contact.dto.js')

class ContactController{
    getContacts = async(req, res) =>{
            let contacts = await contactService.get()
            res.send({status:'success', payload:contacts})
    }
    createContact = async (req, res) => {
      
          let {name, last_name, phone} = req.body
          let result = await contactService.create(newContact)
          let newContact = new ContactDto({ name, last_name, phone})
          
          res.send({status:'success', payload: result})
      }
}

module.exports = new ContactController()