const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/about')

app.use('/', indexRouter.router)
app.use('/about', userRouter.router)

// 配置静态文件目录
app.use(express.static('public'))


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})