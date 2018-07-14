// 本模块作为请求处理模块
// 这样可以将请求处理程序和路由模块连接起来
// 对于不同的 url 需要有不同的处理方式, 例如处理 /start 的业务逻辑就应该和 /upload 不同
// 该模块将从服务器(主文件, index.js) 传递到路由而不是直接传递

/**
 * 处理 post 请求
 *  显示一个文本区（textarea）供用户输入内容，然后通过POST请求提交给服务器。
 *  最后，服务器接受到请求，通过处理程序将输入的内容展示到浏览器中
 * 
 * 
 *  当用户提交表单时，触发 /upload 请求处理程序处理 POST 请求的问题
 *  因此, 采用异步回调来实现非阻塞地处理POST请求的数据
 * 
 *  为了使整个过程非阻塞，Node.js 会将 POST 数据拆分成很多小的数据块，然后通过触发特定的事件，将这些小数据块传递给回调函数。
 *  这里的特定的事件有data事件（表示新的小数据块到达了）以及end事件（表示所有的数据都已经接收完毕）
 * 
 *  通过在request对象上注册监听器（listener） 来告诉 Node 事件触发时调用对应的回调函数
 * 
 *  因此实现思路为:
 *      将 data 和 end 事件的回调函数直接放在服务器中，
 *      在 data 事件回调中收集所有的 POST 数据，
 *      当接收到所有数据，触发end事件后，其回调函数调用请求路由，并将数据传递给它，
 *      然后，请求路由再将该数据传递给请求处理程序
 */

/**
 * 注意, 传递进来的 post 数据包含整个消息体, 实际只需要 text 字段
 */

const querystring = require("querystring");
const MarkdownIt = require('markdown-it')
const fs = require('fs')
const formidable = require('formidable')


const start = (res) => {
    console.dir(`Request handler 'start' was called.`, { colors: true })

    const body = `
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            </head>
            <body>
                <h3>图片上传</h3>
                <form action="/upload" enctype="multipart/form-data" method="post">
                    <input type="file" name="upload">
                    <input type="submit" value="Upload file">
                </form>
            </body>
        </html>
    `

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(body)
    res.end()
}

const upload = (res, req) => {
    // let data = querystring.parse(postData).text
    // let md = new MarkdownIt()
    // let mdData = md.render(data)

    // console.dir(`Request handler 'upload' was called.`, { colors: true })
    // res.writeHead(200, { 'Content-type': 'text/html' })
    // res.write(`Your Result: ${mdData}`)
    // res.end()
    let form = new formidable.IncomingForm()
    form.parse(req, (error, fields, files) => {
        fs.renameSync(files.upload.path, './tmp/test.png')
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("received image:<br>");
        res.write("<img src='/show'>");
        res.end();
    })
}

const show = (res) => {
    console.dir(`Request handler 'show' was called `, { colors: true })
    fs.readFile('./tmp/test.png', 'binary', (error, file) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.write(error + '\n')
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.write(file, 'binary')
            res.end()
        }
    })
}

module.exports = {
    start: start,
    upload: upload,
    show: show
}