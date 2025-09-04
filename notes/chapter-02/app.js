const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method)
    
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html lang="en">')
        res.write('<head><title>Node server</title></head>')
        res.write('<body><h1>Hello world in first node server</h1></body>')
        res.write('</html>')
        return res.end()
    } else if (req.url === '/products') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html lang="en">')
        res.write('<head><title>Node server product</title></head>')
        res.write('<body><h1>Product</h1></body>')
        res.write('</html>')
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html lang="en">')
    res.write('<head><title>Node server</title></head>')
    res.write('<body><h1>404 not found this page</h1></body>')
    res.write('</html>')
    return res.end()
})

const port = 3000

server.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})