const fs = require('fs')
const app = express()
const server = require('http').createServer
const io = require('socket.io').listen(server)

const users = []
const connections = []

