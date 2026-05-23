const express = require('express')

const app = express()

app.use((req, res) => {
    res.send("Hello World!! I feel so good project 1")
})

app.listen(8080, () => {
    console.log("Start Server localhost:8080")
})