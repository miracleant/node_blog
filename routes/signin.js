var express=require('express');
var router=express.Router();

var checkNotLogin=require('../middlewares/check').checkLogin;

//GET /signin 登录页
router.get('/',checkNotLogin,function(req,res,next){
    res.send(res.flash());
});

//POST /signin 用户登录
router.post('/',checkNotLogin,function(req,res,next){
    res.send(res.flash());
});

module.exports=router;
