const Post = require('../models/posts')

module.exports.home = function(req, res){
    // console.log(req.cookies)
    // res.cookie("user_id", 89)
    Post.find({})
    .populate('user')
    .exec()
    .then(posts => {
        return res.render('home', {
            title : "Codeial | Home",
            posts : posts
        })
    }).catch(err => {
        console.log('error loading post')
    })
    
}

//return res.end(`<h1>Home action is uptodate</h1>`);