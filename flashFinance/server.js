require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
    console.log(`Starting Server ${host}:${port}`);
})