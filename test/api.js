process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const api = require('../api')

chai.use(chaiHTTP)

const { expect, request } = chai

describe('API', () => {
    it('GET / should return uptime', (done) => {
        request(api).get('/').end((e, res) => {
            expect(e).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            expect(res.body).to.include.all.keys('uptime')
            expect(res.body.uptime).to.be.a('number')
            done()
        })
    })
})