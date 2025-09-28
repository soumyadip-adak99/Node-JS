import express from 'express'

const PORT = 3002

const app = express()

// middleware
app.use("/", (req, res, next) => {
    console.log('came in first middleware', req.url, req.method)
    // res.send(`
    //         <html lang="en">
    //             <head>
    //                 <title>First middle ware</title>
    //             </head>
    //             <body>
    //                 <h1>Come to first middleware</h1>
    //             </body>
    //         </html>
    //     `)
    next()
})

app.use("/", (req, res, next) => {
    console.log('came in first middleware', req.url, req.method)
    res.send(`
            <h1>Came from another middleware</h1>
        `)
    next()
})

// middleware
app.use("/see", (req, res, next) => {
    console.log("Came in second middleware", req.url, req.method)
    res.send(`
            <html lang="en">
                <head>
                    <title>Second middle ware</title>
                </head>
                <body>
                    <p>Second middleware</p>
                </body>
            </html>
        `)
})


app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})


