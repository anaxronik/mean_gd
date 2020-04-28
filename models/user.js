const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const configDB = require('../config/db');


const UserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserByLogin = function (login, callback) {
    const query = { login: login }
    User.findOne(query, callback)
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}

module.exports.addUser = function (newUser, callback) {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}