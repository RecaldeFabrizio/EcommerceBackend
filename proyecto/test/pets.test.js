const chai = require ('chai')
const supertest = require('supertest')


const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('test CRUD para pets', ()=>{
    let petid
    it('GET para traer una mascota (PETS)', async ()=>{
        const result = await requester.get('/api/pets')
        expect(result.status).to.equal(200)
        expect(result.body).to.have.property('payload')
        expect(result.body.payload).to.be.an('array')
    })
    it('GET by ID para una mascota (PETS)', async ()=>{
        petid = '64dd481df4ec9355e5659fa3'
        const result = await requester.get(`/api/pets/${petid}`)
        expect(result.status).to.equal(200)
        expect(result.body).to.have.property('payload')
        expect(result.body.payload).to.have.property('_id', petid)
    })
})