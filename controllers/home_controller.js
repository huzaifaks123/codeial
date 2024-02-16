module.exports.home = function(req, res){
    return res.render('home', {
        title : "Home"
    })
}

//return res.end(`<h1>Home action is uptodate</h1>`);