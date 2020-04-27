const express = require('express')
const router = express.Router()


router.get('/reg', (req, res) => {
    res.send('/account/reg Page')
})

router.get('/auth', (req, res) => {
    res.send('/account/auth Page')
})

router.get('/dashboard', (req, res) => {
    res.send('/account/dashboard Page')
})


module.exports = router