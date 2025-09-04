const homeHandler = (req, res) => {
    console.log(req.url, req.method);

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html lang='en'>
                <head>
                    <title>HOME</title>
                </head>
                <body>
                    <a href="/calculator">
                        <p>Calculator</p>
                    </a>
                </body>
            </html>
        `);
        return res.end();

    } else if (req.url === "/calculator") {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html lang='en'>
                <head>
                    <title>CALCULATOR</title>
                </head>
                <body>
                    <form method="POST" action="/calculate-result">
                        <label>Enter numbers</label> <br>
                        <input type="number" name="number1"/> <br>
                        <input type="number" name="number2"/> <br>
                        <input type="submit" value="Submit"/>
                    </form>
                </body>
            </html>
        `);
        return res.end();

    } else if (req.url === "/calculate-result" && req.method === "POST") {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const fullBody = Buffer.concat(body).toString();
            console.log("Raw body:", fullBody);

            const params = new URLSearchParams(fullBody);
            const bodyObject = Object.fromEntries(params);

            console.log("Parsed body:", bodyObject);

            const sum = Number(bodyObject.number1) + Number(bodyObject.number2);
            console.log("Sum:", sum);

            res.setHeader("Content-type", "text/html")
            res.write(`
                    <html>
                        <head>
                            <title>Calculate result</title>
                        </head>
                        <body>
                            <p>Result ${sum}</p>
                        </body>
                    </html>
                `)

            res.statusCode = 302;
            return res.end();
        });

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write("<h1>404 Not Found</h1>");
        return res.end();
    }
};

module.exports = homeHandler;
