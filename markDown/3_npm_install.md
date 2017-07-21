#npm install 
---
1、
npm install | npm i 可以安装某个npm上发布的版本，甚至可一安装本地目录，压缩包和git/github库作为依赖。

2、直接使用npm i安装的模块是不会写入package.json和dependencies的，需要添加参数。

* npm i express --save|npm i express -S；(安装的同时，写入dependencies)
* npm i express --save-dev|npm i express -D (安装的同时，写入devDependencies)
*  npm i express --save --save-exact (安装的同时，写入dependencies)

3、锁定版本号
`npm config set save-exact true`

4、npm shrinkwrap 
    前面说过要锁定依赖的版本，但这并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 "mongoose": "*"。为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），通过运行 npm shrinkwrap，会在当前目录下产生一个 npm-shrinkwrap.json，里面包含了通过 node_modules 计算出的模块的依赖树及版本。上面的截图也显示：只要目录下有 npm-shrinkwrap.json 则运行 npm install 的时候会优先使用 npm-shrinkwrap.json 进行安装，没有则使用 package.json 进行安装。


