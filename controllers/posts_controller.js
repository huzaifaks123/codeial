const Post = require('../models/posts')

module.exports.create = async function (req, res) {
    // console.log(req,req.body,req.body.Content,req.user._id)
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post,
                },
                message : "Post Created"
            })
        }

        req.flash('success', 'Post Created')
        return res.redirect('back')
    } catch (err) {
        console.log('error while creating the post :', err); return
    }
}

// module.exports.destroy = function (req, res) {
//     // console.log(Post, req.params.id)
//     Post.findById(req.params.id)
//         .then(post => {
//             //.id converts _id into String type
//             // console.log(post.user.toString(), req.user.id)
//             if (post.user == req.user.id) {
//                 // post.remove()
//                 post.deleteOne({ _id: req.params.id })
//                     .then(() => {
//                         Comment.deleteMany({ post: req.params.id })
//                             .catch(err => {
//                                 return res.redirect('back')
//                             })
//                         return res.redirect('/');
//                     })
//                     .catch(err => {
//                         // console.error('Error deleting post:', err);
//                         return res.redirect('back');
//                     });
//             } else {
//                 return res.redirect('back')
//             }
//         })
//         .catch(err => {
//             console.log('error deleting post', err)
//         })
// }

module.exports.destroy = async function (req, res) {
    // console.log(Post, req.params.id)
    try {
        let post = await Post.findById(req.params.id)
        //.id converts _id into String type
        console.log(post.user.toString(), req.user.id)
        if (post.user == req.user.id) {
            // post.remove()
                await post.deleteOne({ _id: req.params.id })
                // await Comment.deleteMany({ post: req.params.id })

                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            post_id : req.params.id
                        },
                        message : "Post deleted"
                    })
                }

            req.flash('success', 'Post Deleted')
            return res.redirect('back')
        } else {
            req.flash('error', 'Cannot delete this post')
            return res.redirect('back')
        }
    } catch (err) {
        console.log('error deleting post', err)
    }
}