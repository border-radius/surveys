const express = require('express')
const bodyParser = require('express')

const app = express()
const start = new Date().getTime()

app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    res.json({
        uptime: new Date().getTime() - start,
    })
})

module.exports = app