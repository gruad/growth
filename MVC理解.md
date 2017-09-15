```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

<script type="text/javascript">
MVC概念理解：
			Model:提供/保存数据（管理数据）
			Controller:数据处理，实现业务逻辑
			View：展示数据，提供用户界面


前端发展历程：
		以前的前端工程师相当于模板工程师，负责编写前端页面模板
		Ajax技术诞生，改变了一切
		Web2.0时代到来
		Web2.0:动态页面，富交互，前端数据处理

前端 MVC 框架：
		 前端通过Ajax得到数据，因此也有了处理数据的需求
		 前端代码变的也需要保存数据、处理数据、生成视图，这导致了前端MVC框架的诞生。


MVVM模式：
	View-Model:简化的Controller，唯一作用就是为View提供处理好的数据，不含其它逻辑。

REST接口：
	前后端分离以后，它们之间通过接口通信。
	后端暴露出接口，前端消费后端提供的数据。
	后端接口一般是REST形式，前后端的通信协议一般是HTTP。


Node:
	2009年，Node项目诞生，它是服务器上的JavaScript运行环境。
	Node=javascript+操作系统API


Node的意义：
	  javascript成为服务器脚本语言，与Python和Ruby一样
	  javascript成为唯一的浏览器和服务器都支持的语言
	  前端工程师可以编写后端程序了



前端开发模式的根本改变：
				  1.Node环境下开发
				  2.大量使用服务器端工具
				  3.引入持续集成等软件工程的标准流程
				  4.开发完成后，编译成浏览器可以运行的脚本，放上CDN


全栈工程师：
	  一个人负责开发前端和后端
	  从数据库到UI的所有开发


全栈技能：
	需要掌握的技能
	1.传统前端技能：HTML/JavaScript/CSS
	2.一门后端语言
	3.移动端开发：IOS/Android/HTML5
	4.其他技能：数据库、HTTP等等


未来软件的特点：
		  1.联网
		  2.高并发
		  3.分布式
		  4.跨终端

h5提供了两种客户端存储数据的新方法：
							1.localStorage-没有时间限制的数据存储
							2.sessionStorage-针对一个session的数据存储
h5中数据不是由每个服务器请求传递的，而是只有在请求时使用数据，它是的不影响网站性能的情况下存储大量数据成为可能。
对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。
h5使用JavaScript来存储数据和访问数据。

JSON.parse()
将JavaScript对象表示法（JSON）字符串转换为对象
</script>
</body>
</html>
```
