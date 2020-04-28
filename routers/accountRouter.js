const express = require('express')
const router = express.Router()
const User = require('../models/user');
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const configDB = require('../config/db');


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
    res.status(201)
})

router.post('/auth', (req, res) => {
    const login = req.body.login
    const password = req.body.password
    User.getUserByLogin(login, (err, user) => {
        if (err) { throw err }
        if (!user) {
            return res.json({ success: false, message: 'User is not founded' })
        }

        User.comparePass(password, user.password, (errs, isMatch) => {
            if (err) { throw err }
            if (isMatch) {
                const token = jsonwebtoken.sign(user, configDB.secret, { expiresIn: 3600 * 24 })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email,
                    }
                })
            } else {
                return res.json({ success: false, message: 'password incorect' })
            }
        })
    })
})

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('/account/dashboard Page')
})


module.exports = router