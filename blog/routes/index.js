const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const options = {
        root: __dirname + '/../views/',
    }
    res.sendFile('index.html', options)
})

module.exports = {
    router: router
}