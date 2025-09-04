const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method)

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html lang='en'>")
        res.write("<head><title>Node server</title></head>")
        res.write("<body>")
        res.write('<form action="/submit-details" method="POST">')
        res.write('<input type="text" name="username" placeholder="Enter your name"/><br>')

        res.write('<label for="female">Female:</label>')
        res.write('<input id="female" type="radio" name="gender" value="female"/><br>')

        res.write('<label for="male">Male:</label>')
        res.write('<input id="male" type="radio" name="gender" value="male"/><br>')

        res.write('<input type="submit" value="Submit"/>')
        res.write('</form>')
        res.write('</body>')
        res.write("</html>")
        return res.end()
    } else if (req.url.toLocaleLowerCase() === "/submit-details" && req.method === 'POST') {
        fs.writeFileSync('user.text', "Soumya")
        res.statusCode = 302
        res.setHeader('Location', '/')
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
