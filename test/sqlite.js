process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const chai = require('chai')
const sqlite = require('sqlite3')

const { expect } = chai
const dbPath = path.join(__dirname, '../data/test.db')

describe('SQLite', () => {
    const db = new sqlite.Database(dbPath)

    it('should use sqlite with returning support', (done) => {

        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)', (e) => {
                if (e) {
                    return done(e)
                }

                db.get('INSERT INTO test (value) VALUES (?) RETURNING *', ['test string'], (e, row) => {
                    if (e) {
                        return done(e)
                    }

                    expect(row).to.be.a('object')
                    expect(row).to.have.property('id', 1)
                    expect(row).to.have.property('value', 'test string')
                    done()
                })
            })
        })
    })

    after((done) => {
        fs.unlinkSync(dbPath)
        db.close(() => done())
    })
})