var express=require('express');
var router=express.Router();

/*router.get('/:name',function(req,res){
    res.send('hello '+req.params.name);
});*/
router.get('/:name',function(req,res){
    res.render('user',{
        name: req.params.name
    });
});

module.exports=router;