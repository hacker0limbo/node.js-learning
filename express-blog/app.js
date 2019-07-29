const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const mongoose = require('mongoose')
const Article = require('./models/article')
const bodyParser = require('body-parser')
const session = require('express-session')


// 使用 mongoose orm 操作 mongodb
mongoose.connect("mongodb://localhost/my-test")
const db = mongoose.connection

db.on('error', err => console.log(err))
db.once('open', () => console.log('connect'))

const app = express()
// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// 使用 express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// 使用 flash
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  // 自动去找 articles 这个 collections
  Article.find({}, function(err, articles){
    res.render('index.njk', {
      articles
    })
  })
})

app.get('/articles/new', (req, res) => {
  res.render('new.njk')
})

app.post('/articles/create', (req, res) => {
  let article = new Article(req.body)
  article.save(function(err){
    if (err) {
      console.log(err)
    } else {
      // 添加 flash 信息
      req.flash("success", "Article Added")
      res.redirect('/')  
    }
  })
})

app.get('/articles/:id', (req, res) => {
  Article.findById(req.params.id, function(err, article){
    res.render('show.njk', {
      article
    })
  })
})

app.get('/articles/:id/edit', (req, res) => {
  Article.findById(req.params.id, function(err, article){
    res.render('edit.njk', {
      article
    })
  })
})

app.post('/articles/:id/update', (req, res) => {
  const query = {
    _id: req.params.id
  }

  Article.update(query, req.body, function(err){
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')  
    }
  })
})

app.delete('/articles/:id', (req, res) => {
  // 注意 delete 方法只能使用 js 来发送请求, 无法使用点击事件(发送 get 请求)来操作
  const query = {
    _id: req.params.id
  }

  Article.remove(query, function(err){
    if (err) {
      console.log(err)
    } else {
      res.send('success')
    }
  })

})

app.listen(3000, () => {
  console.log('listing at port 3000')
})