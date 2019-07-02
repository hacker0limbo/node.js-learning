const url = require('url')
const path = require('path')
const fs = require('fs')

// 将请求里面的 url 参数传给 req
const makeQuery = (req) => {
  const p = url.parse(req.url)
  req.query = p.query
}

// 构造 res.send() 函数, 传递给响应
const makeResponse = (res) => {

  res.json = (toSend) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(toSend))
    return res
  }

  res.status = (toSend, ...msgs) => {        
    res.statusCode = toSend
    res.statusMessage = msgs[0]
    res.end()
    return res
  }

  res.send = (toSend) => {
    if (typeof toSend === 'string') {
      res.end(toSend)
    } else if (typeof toSend === 'object') {
      // 如果是一个对象或者一个数组, 自动解析为 json 格式
      res.json(toSend)
    } else if (typeof toSend === 'number') {
      res.status(toSend)
    }
    return res
  }
}

const express = () => {
  // 任务列表, 用来存放所有可以执行的中间件, 不管是什么路径, 下面会根据路径进行匹配
  const tasks = []
  // app 实际相当于 onRequest, 作为 http.createServer 的参数
  const app = (req, res) => {
    // 构造请求, 响应等方法
    makeQuery(req)
    makeResponse(res)

    let i = 0

    const next = () => {

      // 这个时候 tasks 里面已经有所有的中间件函数

      // 开始循环, 判断当前的任务, 同时, i+1, 保证在该中间件结束以后执行权移交给下一个中间件
      const task = tasks[i]
      i += 1

      if (!task) {
        // 如果 task 不存在, 说明已经没有了可执行的中间件
        return 
      }

      if (task.routePath === null || url.parse(req.url).pathname === task.routePath) {
        // 如果是普通的中间件(没有指明路径), 或者是指明了路径的中间件
        task.middleWare(req, res, next)
      } else {
        // 路由上面没有匹配的中间件, 直接下一个
        next()
      }
    }

    next()

  }

  // 构造调用中间件的函数
  // 该函数的功能实际为: 把所有的中间件放到 tasks 这个数组里面, 当请求来的时候(http.createServer(app) 的时候)再进行路径匹配判断
  app.use = (routePath, middleWare) => {
    if (typeof routePath === 'function') {
      // 说明是没有指定的中间件
      middleWare = routePath
      routePath = null
    }

    tasks.push({
      routePath,
      middleWare,
    })
  }

  // 构造成一个闭包
  return app
}

express.static = staticPath => {
  // 因为是一个中间件, 所以返回一个函数
  return (req, res, next) => {
    let reqPath = url.parse(req.url).pathname
    // 当请求为 / 时其实是要请求根目录下面的 index.html, 做一个处理
    if (reqPath === '/') {
      reqPath += 'index.html'
    }
    
    // 根据请求拼接出路径, 即对应到相应的目录
    const filePath = path.join(staticPath, reqPath)
    fs.readFile(filePath, 'binary', (err, content) => {
      if (err) {
        // 如果没有该静态文件, 直接转到下一个中间件
        next()
      } else {
        res.writeHead(200, 'Ok')
        res.write(content, 'binary')
        res.end()
      }
    })
  }
}

module.exports = express