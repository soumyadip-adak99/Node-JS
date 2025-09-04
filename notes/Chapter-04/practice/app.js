const http = require('http')
const homeHandler = require('./controller/userController')

const server = http.createServer(homeHandler)

const PORT = 3000

server.listen(PORT, () => {
    console.log(`PORT: http://localhost:${PORT}`)
})