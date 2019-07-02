const express = require('./lib/express.js')
const bodyParser = require('./lib/bodyParser.js')
const path = require('path')
const http = require('http')

const app = express()

// 使用可以处理静态目录的中间件
app.use(bodyParser)
app.use(express.static(path.join(__dirname, 'static')))


app.use((req, res, next) => {
  // 无路由匹配的中间件
  console.log('m1')  
  next()
})

app.use('/hello', (req, res, next) => {
  // 无路由匹配的中间件
  console.log('m2')  
  next()
})

app.use('/hello', (req, res) => {
  // 当做路由
  console.log('/hello')
  res.send('hello world')
})

app.use('/search', (req, res) => {
  // 测试 post 请求
  const data = 'Send Data: ' + JSON.stringify(req.body)
  res.send(data)
})

app.use((req, res, next) => {
  // 无路由匹配的中间件
  // 如果访问 /hello 是不会执行的, 上面没有调用 next() 
  console.log('m4')
  
  res.send('Not Found')
})


http.createServer(app).listen(3000)