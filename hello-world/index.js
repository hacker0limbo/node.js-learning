const express = require('express')
const app = express()
const indexRouter = require('./routes/index.js')
const aboutRouter = require('./routes/about.js')

app.use('/', indexRouter)
app.use('/about', aboutRouter)


// var router = express.Router();

// router.get('/', (req, res) => {
//     res.send('首页');
// })

// router.get('/about', (req, res) => {
//     res.send('关于');
// })

// app.use('/', router);

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})