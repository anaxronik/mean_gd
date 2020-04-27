const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')


const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Main Page')
})

app.listen(PORT, () => {
    console.log('===> Server start on port:', PORT)
})