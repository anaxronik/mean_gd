const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const config = require('./config/db')
const accountRouter = require('./routers/accountRouter')
const passportJWT = require('./config/pasport');



const app = express()

const PORT = process.env.PORT || 3000

app.use(passport.initialize())
app.use(passport.session())

passportJWT(passport)

// необходим чтобы сайт мог использовать постороние API
app.use(cors())

app.use(bodyParser.json())

// подключение папки с статическими файлами
app.use(express.static(path.join(__dirname, 'public')))


// подключение к базе данных
mongoose.connect(config.remoteDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('==> Connect to DB')
})
mongoose.connection.on('error', (err) => {
    console.log('==x NOT connect to DB', err)
})


app.get('/', (req, res) => {
    res.send('Main Page')
})

app.use('/account', accountRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, () => {
    console.log('=> Server start on port:', PORT)
})