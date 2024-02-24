const User = require('../models/user')
const path = require('path')
const fs = require('fs')

module.exports.profile = function (req, res) {
    // let 
    return res.render('user_profile', {
        profile_user: req.user
    })

    // res.end(`<h1>User Profile</h1>`);
}

module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
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

    if (req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }

    return res.render('user_sign_in', {
        title: "Codeial | sign In"
    })
}

module.exports.update = async function (req, res) {
    // if(req.user.id == req.params.id ){
    //     await User.findByIdAndUpdate(req.params.id, req.body)
    //     .then(user => {
    //         return res.redirect('/')
    //     })
    //     .catch(err => {
    //         return res.status(401).send('Unauthorised')
    //     })
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('******Multer Error :', err) }
    
                user.name = req.body.name;
                user.email = req.body.email;
    
                if (req.file) {

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back')
    
            })
        } catch (err) {
            req.flash('error', 'Unauthorised')
        return res.status(401).send('Unauthorised')
        }
        
    }

}

module.exports.signOut = function (req, res) {
    req.logout(function () {
        return res.redirect('/')
    });
}
module.exports.create = function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        console.log("password", req.body.password, req.body.confirm_password)
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
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/')
}
module.exports.signOut = function (req, res) {
    // req.logout();
    console.log("logout")
    req.logout(function () {
        req.flash('success', 'Logged out Successfully')
        return res.redirect('/')
    });
    // return res.redirect('/')
}
