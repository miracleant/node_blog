设置全局变量：
	
	git config --global user.email "yourelmail@email.com"
	git config --global user.name  "yourname"

提交一个新的仓库到github
	
	git init
	git add *
	git commit -am "first commit"
	git remote add origin https://......
	git push -u origin master

提交一个项目到已经存在的仓库里

	git remote add origin https://......
	git push -u origin master
	