{
    let createPost = function(){   
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost)
                    deletePost($('.delete-post-button', newPost))
                    console.log(data)
                },
                error : function(error){
                    // console.log(error.responseText)
                }
            })
            
        })

        let newPostDom = function(post){
            return $(`
            <p id="post-${post._id}">
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>
                        ${post.content}
                            <br>
                            <small>
                                ${post.user.name}
                            </small>
            
                                <div class="post-comments">
                                    <form action="/comments/create" method="POST">
                                        <input type="text" name="content" placeholder="Type here to add comment...">
                                        <input type="hidden" name="post" value="${post._id}">
                                        <input type="submit" value="Add Comment">
                                    </form>
                                </div>
            </p>`)
        }

        

    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();

    
}