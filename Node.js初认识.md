### 官网介绍
node.js的是建立在Chrome V8内核的javascript的运行时，可方便地构建快速，可扩展的网络应用程序的平台。
Node.js使用事件驱动，非阻塞I/O模型，轻量、高效，可以完美地处理时时数据，运行在不同的设备上。
> 1. JavaScript最早是运行在浏览器中，然而浏览器只是提供了一个上下文，它定义了使用JavaScript可以做什么，但并没有“说”太多关于JavaScript语言本身可以做什么。事实上，JavaScript是一门“完整”的语言： 它可以使用在不同的上下文中，其能力与其他同类语言相比有过之而无不及。
### V8虚拟机
>Node.js事实上就是另外一种上下文，它允许在后端（脱离浏览器环境）运行JavaScript代码。

>要实现在后台运行JavaScript代码，代码需要先被解释然后正确的执行。Node.js的原理正是如此，它使用了Google的V8虚拟机（Google的Chrome浏览器使用的JavaScript执行环境），来解释和执行JavaScript代码。
### Node.js 是一个运行环境也同时是一个库

> 除此之外，伴随着Node.js的还有许多有用的模块，它们可以简化很多重复的劳作，比如向终端输出字符串。

**因此，Node.js事实上既是一个运行时环境，同时又是一个库。**

### 问题一：为什么是事件驱动的
```javascript
// 步骤一：引入Node.js的http模块
var http=require("http");
// 步骤二：创建http服务器
http.createServer(function(request,response){
// 步骤三：createSever()方法接受一个回调函数，**当有http请求的时候触发**
consloe.log("request has received !");
response.writeHead(200,{"content-Type":"text/plain"});
response.write("hello Peck");
response.end();
}).listen(8888);
console.log("Sever has start !");
// 结果： 先Sever has start !，后当打开8888时发送http，触发请求处理handler事件的回调函数。request has received !
```
#### Node.js如何分离代码，解耦，封装模块？
server.js文件：
```javascript
var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
 这时候在index.js文件中：
```javascript
var server = require("./server");

server.start();
```
### Node.js如何让http服务器处理不同请求呢（路由）
而请求request对象的get参数在url上，当然post的也可以解析,引入node的自有模块url和queryString模块
```javascript
var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

**上面代码的问题是什么呢？我们想把处理路由的部分单独分离出来，做为一个单独的模块**
现在我们可以来编写路由了，建立一个名为router.js的文件，添加以下内容：
```javascript
function route(pathname){
console.log("About to route a request for " +pathname);

exports.route=route;
}
```
### 然后用依赖注入的方式较松散地添加路由模块
```
var http = require("http");
var url = require("url");

function start(route){
function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
同时，我们会相应扩展index.js，使得路由函数可以被注入到服务器中：
```javascript
var server = require("./server");
var router = require("./router");
// 经典
server.start(router.route);
```
**但是还是有个很大的问题，就是分离出处理route的正在requestHandler**

所以最终程序

sever.js模块内容：

```javascript
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    var content = route(handle, pathname)
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
index.js模块内容:
```javascript
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
// 理解的重点（对象实现，关联数组）
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
```
requestHandler.js
```javascript
function start() {
  console.log("Request handler 'start' was called.");
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
```
**路由有路可寻**
router.js模块:
```javascript
function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
}

exports.route = route;
```

### 阻塞和非阻塞
> Node一向是这样来标榜自己的：“在node中除了代码，所有一切都是并行执行的”。

>这句话的意思是说，Node.js可以在不新增额外线程的情况下，依然可以对任务进行并行处理 —— Node.js是单线程的。它通过事件轮询（event loop）来实现并行操作，对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。
###  原文
[www.nodebeginner.org](https://www.nodebeginner.org/index-zh-cn.html#javascript-and-nodejs)




