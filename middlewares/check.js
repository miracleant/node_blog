module.exports={
    checkLogin:function checkLogin(req,res,next){
        if(!req.session.user==="undefined"){
            req.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin:function checkNotLogin(req,res,next){
        if(req.session.user!=="unidefined"){
            req.flash('error','已登录');
            return res.redirect('back');
        }
        next();
    }
}