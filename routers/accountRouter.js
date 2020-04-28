const express = require('express')
const router = express.Router()
const User = require('../models/user');


// router.get('/reg', (req, res) => {
//     res.send('/account/reg Page')
// })

router.post('/reg', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
    })
    User.addUser(newUser, (err, user) => {
        if (err)
            res.json({ success: false, message: 'User is NOT add' })
        else
            res.json({ success: true, message: 'User has been add' })

    })
    // res.send('/account/reg Page')
})

router.get('/auth', (req, res) => {
    res.send('/account/auth Page')
})

router.get('/dashboard', (req, res) => {
    res.send('/account/dashboard Page')
})


module.exports = router