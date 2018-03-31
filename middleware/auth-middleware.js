module.exports = 
function(req,res,next){ 
    if(req.session.username) {
        next()
    }else{ 
        console.log("NOT LOGGED IN !!!")
        res.redirect("/seller/login")
    }
}