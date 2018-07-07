const express = require('express')
const router = express.Router()

router.get('/about', function(req, res) {
    res.send('about')
})

module.exports = router