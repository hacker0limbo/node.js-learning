const express = require('express')
const router = express.Router()

router.get('/about', (req, res) => {
    res.send('about page')
})

module.exports = router