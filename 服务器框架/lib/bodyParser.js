const bodyParser = (req, res, next) => {
  // 可以用于处理 post 请求, 数据存在 req.body 里面
  let body = ''
  req.on('data', chunk => {
    body += chunk
  }).on('end', () => {
    req.body = parsedBody(body)
    next()
  })
}

const parsedBody = (body) => {
  const o = {}
  body.split('&').forEach(e => {
    o[e.split('=')[0]] = e.split('=')[1]
  })
  return o
}

module.exports = bodyParser
