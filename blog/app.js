const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index.js')
const blogRouter = require('./routes/blog.js')

app.use(bodyParser.json())
app.use(express.static('public'))

// 路由
app.use('/', indexRouter.router)
app.use('/api/blog', blogRouter.router)


const server = app.listen(5000, () => {
    console.log('访问 localhost:5000');
})