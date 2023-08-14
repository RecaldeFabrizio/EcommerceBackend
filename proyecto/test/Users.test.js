import mongoose from 'mongoose'
import UserDao from '../src/dao/Users.dao.js'
import Assert from 'assert'
//import updateOne  from'../src/dao/models/User.js'

mongoose.connect('mongodb://localhost:27017/proyectos')

const assert = Assert.strict

describe('Testing de User Dao', ()=>{
    before(function(){
        this.userDao = new UserDao()
    })
    beforeEach(function(){3.
       
        this.timeout(2000)
    })
    it('El dao debe traer un usuario correctamente de la DB', async function(){
        const result = await this.userDao.get()
        console.log(result)
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El dao debe crear un usuario correctamente de la DB', async function(){
        let userMock = {
            first_name: 'Fabrizio',
            last_name: 'Recadel',
            email: 'fabrizio.recalde98@gmail.com',
            password: '123321'
        }

        const result = await this.userDao.save(userMock)

        const user = await this.userDao.getBy({email: result.email})
        console.log(user)
        assert.strictEqual(typeof user, 'object')
    })
    // it('El dao debe modificar un usuario correctamente de la DB', async function(){
    //     const _id = '64d57656e389883b9d853309'
    //     let userUpdate = {
    //         first_name: 'Fabrizio'
    //     }
    //     const result = await this.userDao.update(_id, userUpdate)
    //     const user = await this.userDao.getBy({_id})
    //     assert.strictEqual(user.first_name, userUpdate.first_name)
    // })
    // it('El dao debe eliminar un usuario correctamente de la DB', async function(){
    //     const _id = '64d57656e389883b9d853309'
    //     const result = await this.userDao.delete({_id})
    //     assert.strictEqual(typeof result, 'object')
    // })


})
