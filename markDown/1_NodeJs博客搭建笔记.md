# NodeJs博客搭建笔记

标签（空格分隔）： NodeJs
---
1、NodeJs知识点详解
    
*require*
require用来加载一个文件的代码。
        
* require的目录机制是：
            
    - 如果目录下有package.json并指定了mian字段，则用。
    - 如果不存在packag.json,则依次尝试加载index.js和index.node
       
* require文件会加载到缓存，所以多次require同一个文件（模块）不会重复加载
       * 判断是否是程序的入口文件有两种方式：
            
            require.main===module(推荐)
            module.parent===null

2、循环引用
如果哪一天发现已经exports了的方法报undefined is not a function,那么很有可能是循环依赖的陷阱。