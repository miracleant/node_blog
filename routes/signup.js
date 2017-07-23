var express=require('express');
var router=express.Router();

var checkNotLogin=require('../middlewares/check').checkLogin;

//GET 注册页面
router.get('/',checkNotLogin,function(req,res,next){
    res.send(res.flash());
});

//POST 用户注册
router.post('/',checkNotLogin,function(req,res,next){
    res.send(res.flash());
});

module.exports=router;