module.exports.home = function(req, res){
    console.log(req.cookies)
    res.cookie("user_id", 89)
    return res.render('home', {
        title : "Home"
    })
}

//return res.end(`<h1>Home action is uptodate</h1>`);