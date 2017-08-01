var express=require('express');
var router=express.Router();

var USerModel=require('../models/users');
var checkNotLogin=require('../middlewares/check').checkLogin;

//GET /signin 登录页
router.get('/',checkNotLogin,function(req,res,next){
    //res.send(res.flash());
    res.render('signin');
});

//POST /signin 用户登录
router.post('/',checkNotLogin,function(req,res,next){
    //res.send(res.flash());
    var name=req.fields.name;
    var password=req.fields.password;

    USerModel.getUserByName(name)
        .then(function (user) {
            if(!user){
                req.flash('error','用户不存在');
                return res.recirect('back');
            }

            if(sha1(password)!==user.password){
                req.flash('error','用户名或密码错误');
                return res.redirect('back');
            }

            req.flash('success','登录成功');

            delete user.password;
            req.session.user=user;

            res.redirect('/posts');
        })
        .catch(next);
});

module.exports=router;
