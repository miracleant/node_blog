/*var path=require('path');
var express=require('express');
var app=express();
var indexRouter=require('./routes/index.js');
var userRouter=require('./routes/users.js');

app.set('views',path.join(__dirname,'views'));//设置模板引擎的目录
app.set('view engine','ejs');//设置模板引擎为ejs
app.use('/',indexRouter);
app.use('/user',userRouter);

app.get('/',function(req,res){
	res.send('hello world');
});

app.listen(3000);*/

var path=require('path');
var express=require('express');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var flash=require('connect-flash');
//var config=require('config-lite')(__dirname);
var config=require('config-lite')({
    filename:'default',
    config_basedir:__dirname,
    config_dir:'config',
});
var routes=require('./routes');
var pkg=require('./package');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

//session中间件
app.use(session({
    name:config.session.key,
    secret:config.session.secret,
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:config.session.maxAge
    },
    store:new MongoStore({
        url:config.mongodb
    })
}));

routes(app);

app.listen(config.port,function(){
    console.log(`${pkg.name} listening on port ${config.port}`);
});