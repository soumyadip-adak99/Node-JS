const fs = require('fs')

const requestHandler = (req, res) => {
    console.log(req.url, req.method)

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

        const body = []

        req.on('data', chunk => {
            console.log(chunk)

            body.push(chunk);
        });

        req.on('end', () => {
            const fullBody = Buffer.concat(body).toString()
            console.log(fullBody)

            const params = new URLSearchParams(fullBody)
            // const boydObject = {}

            // for (const [key, value] of params.entries()) {
            //     boydObject[key] = value
            // }

            const boydObject = Object.fromEntries(params)

            console.log(boydObject)

            fs.writeFileSync('user.text', JSON.stringify(boydObject))
        })


        res.statusCode = 302
        res.setHeader('Location', '/')
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html lang="en">')
    res.write('<head><title>Node server</title></head>')
    res.write('<body><h1>404 not found this page</h1></body>')
    res.write('</html>')
    return res.end()
}

module.exports = requestHandler;