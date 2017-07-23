##中间件与next
1、express 中的中间件(midlleware)用来处理请求的，当一个中间件处理玩，可以通过调用`next()`传递给下一个中间件，如果没有调用next()，则请求不会往下传递，如内置的`res.redenr`其实就是在渲染完html之后直接返回给客户端，从而没有传递给下一个中间件。看个小例子，修改nodejs如下：

index.js
	
	var express=require('express');
	var app=express();

	app.use(function(req,res,next){
		console.log('1');
		next();
		});
	app.use(function(req,res,next){
		console.log('2');
		res.status(200).end();
		});
	app.listen(3000);

此时访问localhost:3000，终端会输出：
	
	1
	2

通过app.use加载中间件，在中间件中通过`next`会将请求传递到下一个中间件，next可接受一个参数接收错误信息，如果使用`next(error)`,则会返回错误而不会传递到下一个中间件，修改index.js如下：
indes.js
	
	var express=require('express');
	var app=express();

	app.use(function(req,res,next){
		console.log('1');
		next(new Error('haha'));
		});

	app.use(function(req,res,next){
		console.log('2');
		res.status(200).end();
		});

	app.listen(3000);

注意：中间件的加载顺序很重要！比如：通常把日志中间件放在靠前的位置，后面会介绍的connert-flash中间件是基于seesion的所以需要在express-session后加载。


2、错误处理

上面的例子中，应用程序为我们自动返回了错误栈信息（express内置了一个默认的错误处理器）,假如我们想手动控制返回的错误内容，则需要加载一个自定义错误处理的中间件，修改index.js如下：
	
		var express=require('express');
		var app=express();

		app.use(function(req,res,next){
			console.log('1');
			next(new Error('haha'));
			});

		app.use(function(res,req,next){
			console.log('2');
			res.status(200).end();
			});
		app.use(function(err,req,res,next){
			console.log(err.stack);
			res.status(500).send('something error!');
			});

		app.listen(3000);


	 