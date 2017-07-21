var path=require('path');
var express=require('express');
var app=express();
var indexRouter=require('./routes/index.js');
var userRouter=require('./routes/users.js');

app.set('views',path.join(__dirname,'views'));//设置模板引擎的目录
app.set('view engine','ejs');//设置模板引擎为ejs

app.use('/',indexRouter);
app.use('/user',userRouter);

/*
app.get('/',function(req,res){
	res.send('hello world');
});
*/


app.listen(3000);
