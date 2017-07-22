var express=require('express');
var app=express();

app.use(function (req,res,next) {
   console.log('1');
   next(new Error('haha'));
});

app.use(function (req,res,next) {
    console.log('2');
    res.status(200).end();
});

app.use(function (err,req,res,next) {
    console.log(err.stack);
    res.status(500).send('something  error!');
});

app.listen(3000);