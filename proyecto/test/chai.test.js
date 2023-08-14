import mongoose from 'mongoose'
import User from '../src/dao/Users.dao.js'
import chai from 'chai'

mongoose.connect('mongodb://localhost:27017/proyectos')
const expect = chai.expect

describe('Set de test User en cahi', ()=> {
    before(function () {
        this.userDao = new User()
    })
    beforeEach(function(){
        // mongoose.connection.collections.users.drop()
        this.timeout(2000)
    })
    // it('El dao debe poder obtener todos los usuario en un arreglo', async function(){
    //     const result = await this.userDao.get({})
    //     console.log(result)
    //     expect(result).to.be.deep.equal([])
    //     expect(result).deep.equal([])
    //     expect(Array.isArray(result)).to.be.ok
    //     expect(Array.isArray(result)).to.be.equals(true)
    // })
    // it('El dao debe modificar un usuario correctamente de la DB', async function(){
    //     const _id = '64d57656e389883b9d853309'
    //     // const createUser = await this.userDao.save
    //     let userUpdate = {
    //         first_name: 'Fabrizio'
    //     }
    //     const result = await this.userDao.update(_id, userUpdate)
    //     const user = await this.userDao.getBy({_id})
    //     expect(user).to.have.property('first_name', 'Fabrizio')
    // })
    it('El dao debe eliminar un usuario correctamente de la DB', async function(){
        let userMock = {
            first_name: 'Fabrizio1',
            last_name: 'Recalde1',
            email: 'fabrizio.recalde981@gmail.com',
            password: '123321'
        }

        const result = await this.userDao.save(userMock)
        const resultDelete= await this.userDao.delete({_id: result._id})
        console.log(resultDelete)
        expect(resultDelete).to.be.an('object')
        expect(resultDelete).to.have.property('_id')
        expect(resultDelete._id.toString()).to.equal(result._id.toString());
       
    })
})
