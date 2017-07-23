module.exports={
    checkLogin:function checkLogin(req,res,next){
        if(!res.session.user){
            res.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin:function checkNotLogin(req,res,next){
        if(res.session.user){
            res.flash('error','已登录');
            return res.redirect('back');
        }
        next();
    }
}