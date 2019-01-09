const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = ''
        req.on('data', (data) => {
            body += data
        })

        req.on('end', () => {
            fs.writeFile(__dirname + '/data.txt', body, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/plain",
                        'Access-Control-Allow-Origin': '*'
                    })
                    res.end()
                }
            })
        })
    } else if (req.method == 'GET') {
        res.writeHead(200, {
            "Content-Type": "text/plain",
            'Access-Control-Allow-Origin': '*'
        })

        fs.readFile(__dirname + '/data.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.write(data)
                res.end()
            }
        })
    }
})

server.listen(3000)

console.log('Server running on port 3000.')