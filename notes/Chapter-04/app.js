const http = require('http')
const userRequestHandler = require('./user')

const PORT = 3001

const server = http.createServer(userRequestHandler)

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})