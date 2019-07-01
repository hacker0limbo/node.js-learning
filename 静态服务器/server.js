const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

const parseBody = (body) => {
  // body 形式为 a=1&b=2
  // 解析完毕为 {
  //  a: 1,
  //  b: 2,
  // }
  const o = {}
  body.split('&').forEach(e => {
    o[e.split('=')[0]] = e.split('=')[1]
  })
  return o
}

const routes = {
  '/a': (req, res) => {
    res.end(JSON.stringify(req.query))
  },

  '/a/c': (req, res) => {
    res.end('路由为 /a/c')
  },

  '/search': (req, res) => {
    for (const [k, v] of Object.entries(req.body)) {
      res.write(`${k}=${v}, `)
    }
    res.end()
  }
}

const staticRoot = (staticPath, req, res) => {
  // 请求可能为 localhost:3000/css/style.css?a=1, 那么 pathname 应该为 /css/style.css
  let reqPath = url.parse(req.url).pathname
  
  // 当请求为 / 时其实是要请求根目录下面的 index.html, 做一个处理
  if (reqPath === '/') {
    reqPath += 'index.html'
  }
  // 根据请求拼接出路径, 即对应到相应的目录
  const filePath = path.join(staticPath, reqPath)

  // 读取文件并返回到客户端
  fs.readFile(filePath, 'binary', (err, fileContent) => {
    if (err) {
      // 404
      res.writeHead(404, 'not found')
      res.end('404')
    } else {
      res.writeHead(200, 'ok')
      res.write(fileContent, 'binary')
      res.end()
    }
  })
}

const routePath = (req, res) => {
  const pathObj = url.parse(req.url)
  const handler = routes[pathObj.pathname]
  if (typeof handler === 'function') {
    // 如果有对应的路由函数, 将 GET 请求里面附加的参数传递给 req.query
    req.query = pathObj.query
    let body = ''

    // 接受 post 请求里面的数据
    req.on('data', chunk => {
      body += chunk
    }).on('end', () => {
      // 将 POST 请求里面发送到服务器里面的数据解析以后传递给 req.body
      req.body = parseBody(body)
      handler(req, res)
    })
  } else {
    staticRoot(path.resolve(__dirname, 'static'), req, res)
  }

}


const server = http.createServer((req, res) => {
  routePath(req, res)
})

server.listen(3000)
