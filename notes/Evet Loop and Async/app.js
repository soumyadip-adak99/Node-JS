const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
})

const PORT = 3000

server.listen(PORT, () => {
    console.log(`server running: http://localhost:${PORT}`)
})

