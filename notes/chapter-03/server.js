const http = require('http')

const PORT = 3001

function renderNavbar() {
    return `
        <div style="align-items: center; display: flex;">
            <ul style="display: flex; gap: 10px; list-style-type: none;">
                <li><a href="/" style="text-decoration: none; color: blue; cursor: pointer;">Home</a></li>
                <li><a href="/men" style="text-decoration: none; color: blue; cursor: pointer;">Men</a></li>
                <li><a href="/women" style="text-decoration: none; color: blue; cursor: pointer;">Women</a></li>
                <li><a href="/kids" style="text-decoration: none; color: blue; cursor: pointer;">Kids</a></li>
            </ul>
        </div>
    `;
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method)

    res.setHeader('Content-type', 'text/html')
    res.write('<html lang="en">')
    res.write('<head><title>Server js</title></head>')
    res.write('<body>')
    res.write(renderNavbar())

    if (req.url === "/") {
        res.write('<h1>Welcome to Home page</h1>')
    } else if (req.url.toLowerCase() === "/men") {
        res.write('<h1>Welcome to Men page</h1>')
    } else if (req.url.toLowerCase() === "/women") {
        res.write('<h1>Welcome to Women page</h1>')
    } else if (req.url.toLowerCase() === "/kids") {
        res.write('<h1>Welcome to Kids page</h1>')
    } else {
        res.write('<h1>404 Not found this page</h1>')
    }

    res.write('</body>')
    res.write('</html>')
    return res.end()
})

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})
