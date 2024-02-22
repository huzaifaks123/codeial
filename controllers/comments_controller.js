const Comment = require('../models/comments')
const Post = require('../models/posts')

module.exports.create = function(req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (!post) {
                console.log('Post not found');
            }

            // Create the comment
            Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                .then(comment => {
                    post.comment.push(comment);
                    return post.save();
                })
                .then(() => {
                    console.log('Comment added successfully');
                    return res.status(200).send('Comment added successfully');
                })
                .catch(err => {
                    console.error('Error while adding comment:', err);
                    return res.status(500).send('Internal Server Error');
                });
        })
        .catch(err => {
            console.error('Error while finding post:', err);
            return res.status(500).send('Internal Server Error');
        });
};

// module.exports.create = function(req, res){
//     Post.findById(req.body.post)
//     .then(post => {
//         if(post){
//             Comment.create({
//                 content : req.body.content,
//                 post : req.body.post,
//                 user : req.user._id
//             })
//             .then(comment => {
//                 post.comment.push(comment);
//                 post.save()
//             }).catch(err => {
//                 console.log('Error while adding comment')
//             })
//         }
//     })
//     .catch(err => {
//         console.log('Error while adding  post comment')
//     })
// }