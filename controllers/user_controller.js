const User = require('../models/user')

module.exports.profile = function (req, res) {
    return res.render('user_profile', {

    })

    // res.end(`<h1>User Profile</h1>`);
}

module.exports.signUp = function (req, res) {

    if(req.isAuthenticated()){
       return res.redirect('/user/profile') 
    }

    return res.render('user_sign_up', {
        title: "Codeial | sign Up"
    })
}
module.exports.posts = function (req, res) {
    return res.render('user_posts', {
        title: "Codeial | sign Up"
    })
}
module.exports.signIn = function (req, res) {
    
    if(req.isAuthenticated()){
        return res.redirect('/user/profile') 
     }

    return res.render('user_sign_in', {
        title: "Codeial | sign In"
    })
}
module.exports.signOut = function (req, res) {
    req.logout(function(){
        return res.redirect('/')
    });
}
module.exports.create = function (req, res) {
    if(req.body.password !== req.body.confirm_password){
        console.log("password",req.body.password,req.body.confirm_password)
        return res.redirect('back')
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                User.create(req.body);
                return res.redirect('/user/sign-in');
            } else {
                console.log("User alreasy Exists");
                return res.redirect('/user/sign-in');
            }
        })
        .catch(err => {
            console.error("Error in finding user in sign up page :", err);
            return
        });



    // if(req.body.password != req.body.confirmPassword){
    // }

    // User.findOne({ email: req.body.email }, (err, user) => {
    //     if (err) { console.log("error in finding user in signing up"); return }

    // if (!user) {
    //     user.create(req.body, function (err, user) {
    //         if (err) { console.log("error in creating user while signing up"); return }

    //         return res.redirect('user/sign-in')
    //     })
    // } else {
    //     // return res.redirect('back')
    // }
    // })
}
module.exports.createSession = function (req, res) {
    // todo
    return res.redirect('/')
}
