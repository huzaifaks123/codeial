const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password !== password) {
                    req.flash('error', 'invalid username/password')
                    console.log('error', 'invalid username/password')
                    return done(null, false);
                } else {
                    return done(null, user)
                }
            })
            .catch(err => {
                req.flash('error', err)
                return done(err)
            })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log("error in finding user")
        })
})




passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}   



module.exports = passport