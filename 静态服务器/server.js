const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

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

const server = http.createServer((req, res) => {
  staticRoot(path.join(__dirname, 'static'), req, res)
})

server.listen(3000)
