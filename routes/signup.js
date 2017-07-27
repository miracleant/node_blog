var fs=require('fs');
var path=require('path');
var sha1=require('sha1');

var express=require('express');
var router=express.Router();

var checkNotLogin=require('../middlewares/check').checkLogin;

//GET 注册页面
router.get('/',checkNotLogin,function(req,res,next){
    //res.send(res.flash());
    res.render('signup');
});

//POST 用户注册
router.post('/',checkNotLogin,function(req,res,next){
    //res.send(res.flash());
    var name=req.fields.name;
    var password=req.fields.password;
    var repassword=req.fields.repassword;
    var bio=req.fields.bio;
    var gender=req.fields.gender;
    var avatar=req.files.avatar.path.split(path.sep).pop();

    //校验参数
    try{
        if(!(name.length>=1&&name.length<=10)){
            throw new Error('名字现在1-10之间');
        }
        if(['m','f','x'].indexOf(gender)===-1){
            throw new Error('性别只能是男,女或保密');
        }
        if(!(bio.length>=1&&bio.length<30)){
            throw new Error('个人简介请限制在1-30行之间');
        }
        if(!req.files.avatar.name){
            throw new Error('缺少头像');
        }
        if(password.length<6){
            throw new Error('密码至少6个字符');
        }
        if(password!==repassword){
            throw new Error('两次输入密码不一致');
        }
    }catch(e){
        fs.unlink(req.files.avatar.path);
        rq.flash('error',e.message);
        return res.redirect('/signip');
    }

    //明文密码加密
    password=sha1(password);

    //待写入数据库的用户信息
    var user={
        name:name,
        password:password,
        gender:gender,
        bio:bio,
        avatar:avatar
    };

    //用户信息写入数据库
    UserModel.create(user)
        .then(function(result){
            user=result.ops[0];

            delete user.password;
            req.session.user=user;

            req.flash('success','注册成功');

            res.redirect('/posts')
        })
        .catch(function (e) {
          fs.unlink(req.files.avatar.path);

          if(e.message.match('E11000 duplicate key')){
              req.flash('error','用户名已被占用');
              return res.redirect('/signup');
          }
          next(e);
        });
});

module.exports=router;