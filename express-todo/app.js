const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const todoController = require('./controllers/todoController')

// 使用 nunjucks 模板引擎
nunjucks.configure('views', {
  autoescape: true,
  express: app
})
app.use(express.static('./public'))

todoController(app)

app.listen(3000)
console.log('listening at port 3000')
