# 初始化一个Express项目  
---
1、使用npm init初始化一个项目

安装express并写入package.json
`npm i express@4.14.0 --save`

2、新建index.js，添加如下代码：

    var express =require('express');
    var app=express();

    app.get('/',funciton(res,req){
    res.send('hello,express');   
    });
 
    app.listen(3000);
 
 以上代码的含义是：生成一个express实例app，挂载了一个根路由控制器，然后监听3000端口并启动程序。运行node index,打开浏览器访问   localhost：3000时；页面显示hello express.
 
 
 3、supervisor
 
开发过程中，每次修改代码后，都需要手动重启程序，才能看见修改的效果。使用supervisor可以解决这个繁琐的问题，全局安装supervisor：
`npm i supervisor -g`

运行 `supevisor --harmony index`启动程序。

supervisor 会监听当前目下node和js后缀的文件，当这些文件发生改动时，supervisor会自动重启程序。