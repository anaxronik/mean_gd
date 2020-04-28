const configDB = require('./db');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');


module.exports = function () {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = configDB.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, doneFunction) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return doneFunction(err, false);
            }
            if (user) {
                return doneFunction(null, user);
            } else {
                return doneFunction(null, false);
                // or you could create a new account
            }
        });
    }));
}