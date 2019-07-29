# express 多用户博客系统

使用 express + mongodb 搭建的多用户博客系统

## 技术栈
- express
- mongodb(mongoose)
- bootstrap
- nunjucks

前端使用 bower 管理

问题: flash 无法配合 nunjucks 使用

## 注意点

### mongoose

- Schema 规定每个表(实例的结构), 每个 schema 都会映射到一个 MongoDB collection
- Models 是从 Schema 编译来的构造函数, 它们的实例就代表着可以从数据库保存和读取的 documents,
- 从数据库创建和读取 document 的所有操作都是通过 model 进行的
- Mongoose 会自动找到名称是 model 名字复数形式的 collection

```javascript
const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  }
})

// 这里的 'Person' Model 构造函数名字, 可以使用 new 方法实例化一个 document
// 同时 collection 对应的名字为 persons, 是 Person 的复数形式
const Person = mongoose.model('Person', personSchema)
const p1 = new Person({ name: 'p1', age: 16 })
```

### nunjucks

- 该模板引擎在配合 nodemon 时需要添加配置, 当相应 views 文件更新后自动重启服务器
- 传入变量是一个对象, 这点和 jinja 不同, 如下:
  ```javascript
  const items = [1, 2, 3]
  app.get('/', (req, res) => {
    res.render('index.html', {
      items
    })
  })
  ```

  模板里面获取到变量为:
  ```html
  {% for item in items %}
    <li>{{ item }}</li>
  {% endfor %}
  ```

### flash message
本质是使用 session 来使得不同的路由 controller 之间进行通信. 在一个路由 controller 完成用户的操作以后, 根据用户的情况重定向到另一个路由 controller 的时候可以获得上一个 controller 有关用户操作的信息(比如登录失败/成功等)