const { Router } = require('express')
const {userModel} = require ('../dao/models/user.model.js')
const { logger } = require('../config/logger.js')
const { error } = require('winston')


const router = Router()

router.get('/', async (req, res) =>{
    try {
        // const { limit=5, page=1 }= req.query
        // console.log('limit: ', limit)
        // console.log('page: ', page)

        const result = await userModel.find()
        // const result = await UserModel.paginate({}, {limit, page})  
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        logger.info(error)
    }
})


router.post('/', async (req, res) =>{
    try {
        let {first_name, last_name, email, password} = req.body

        if(!first_name || !last_name || !email || !password){
            return res.status(400).send({'error': error})
        }

        let result = await userModel.create({
            first_name,
            last_name,
            email,
            password
        })
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
       logger.info(error) 
    }
})

module.exports = router