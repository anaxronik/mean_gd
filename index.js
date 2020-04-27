const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const config = require('./config/db')


const app = express()

const PORT = process.env.PORT || 3000

// необходим чтобы сайт мог использовать постороние API
app.use(cors())

app.use(bodyParser.json())

// подключение папки с статическими файлами
app.use(express.static(path.join(__dirname, 'public')))


// подключение к базе данных
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('==> Connect to DB')
})
mongoose.connection.on('error', (err) => {
    console.log('==x NOT connect to DB', err)
})


app.get('/', (req, res) => {
    res.send('Main Page')
})

app.get('/account/reg', (req, res) => {
    res.send('/account/reg Page')
})

app.get('/account/auth', (req, res) => {
    res.send('/account/auth Page')
})

app.get('/account/dashboard', (req, res) => {
    res.send('/account/dashboard Page')
})

app.listen(PORT, () => {
    console.log('=> Server start on port:', PORT)
})