const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const es6Renderer = require('express-es6-template-engine')

// routers
const indexRouter = require('./routes/index.js')
const blogRouter = require('./routes/blog.js')
const commentRouter = require('./routes/comment.js')

app.use(bodyParser.json())
app.use(express.static('public'))

app.engine('html', es6Renderer)
app.set('views', 'views')
app.set('view engine', 'html')

// 使用路由
app.use('/', indexRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)

const server = app.listen(5000, () => {
    console.log('访问 localhost:5000');
})