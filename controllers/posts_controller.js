const Post = require('../models/posts')

module.exports.create = function(req, res){
    // console.log(req,req.body,req.body.Content,req.user._id)
    Post.create({
        content : req.body.content,
        user: req.user._id,
    })
    .then(post => {
        return res.redirect('back')
    })
    .catch(err => {
        console.log('error while creating the post :', err); return})
}