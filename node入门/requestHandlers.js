// 本模块作为请求处理模块
// 这样可以将请求处理程序和路由模块连接起来
// 对于不同的 url 需要有不同的处理方式, 例如处理 /start 的业务逻辑就应该和 /upload 不同
// 该模块将从服务器(主文件, index.js) 传递到路由而不是直接传递

// const exec = require('child_process').exec

/**
 * 处理 post 请求
 *  显示一个文本区（textarea）供用户输入内容，然后通过POST请求提交给服务器。
 *  最后，服务器接受到请求，通过处理程序将输入的内容展示到浏览器中
 * 
 * 
 *  当用户提交表单时，触发 /upload 请求处理程序处理 POST 请求的问题
 *  因此, 采用异步回调来实现非阻塞地处理POST请求的数据
 */

const start = (res) => {
    console.dir(`Request handler 'start' was called.`, { colors: true })

    const body = `
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            </head>
            <body>
                <form action="/upload" method="post">
                    <textarea name="text" rows="20" cols="60"></textarea>
                    <input type="submit" value="Submit text" />
                </form>
            </body>
        </html>
    `

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(body)
    res.end()

}

const upload = (res) => {
    console.dir(`Request handler 'upload' was called.`, { colors: true })
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.write('Upload')
    res.end()

}

module.exports = {
    start: start,
    upload: upload
}