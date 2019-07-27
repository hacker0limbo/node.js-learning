const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://stephenYin:Alleniverson@cluster0-lf2uo.mongodb.net/todos?retryWrites=true&w=majority', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  item: String
})

// 一个 model 对应一个表
const Todo = mongoose.model('Todo', todoSchema)


module.exports = app => {
  app.get('/todo', (req, res) => {
    // 得到所有的记录
    Todo.find({}, (err, data) => {
      if (err) {
        throw err
      }
      res.render('todo.html', { todos: data })
    })
  })

  app.post('/todo', jsonParser, (req, res) => {
    // 增加一条记录
    const newTodo = new Todo(req.body).save((err, data) => {
      if (err) {
        throw err
      }
      res.json(data)
    })
  })

  app.delete('/todo/:item', (req, res) => {
    // 查找记录
    Todo.find({item: req.params.item.replace(/-/g, " ")})
      .remove((err, data) => {
        if (err) {
          throw err
        }
        res.json(data)
      })
  })
}