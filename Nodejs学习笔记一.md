- a. 编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，文件路径就是模块名。
- b. 一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。
- c. NodeJS是一个JS脚本解析器，任何操作系统下安装NodeJS本质上做的事情都是把NodeJS执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端下可以使用node命令。
- d. 终端下直接输入node命令可进入*命令交互模式*，很适合用来测试一些JS代码片段，比如正则表达式。
- e.NodeJS使用CMD模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。
- f.除非JS模块不能满足需求，否则不要轻易使用二进制模块，否则你的用户会叫苦连天。

### 使用NodeJS编写程序前，为了有个良好的开端，首先需要准备好代码的目录结构和部署方式，就如同修房子要先搭脚手架。

```javascript
-/home/user/lib
    -cat
        head.js
        body.js
        main.js
```
作为一个包，main.js为包的导出模块内容如下
```javascript
var head=require('./head');
var body=require('./body');
exports.create=function(name){
    return{
        name:name,
        head.create(),
        body.create()
    };

};
```
当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。
```javascript
var cat=require('/home/user/lib/cat/main');
var cat=require('/home/user/lib/cat/index');
var cat=require('/home/user/lib/cat');
```
这样处理后，就只需要把包目录路径传递给require函数，感觉上整个目录被当作单个模块使用，更有整体感。

### package.json
```
-/home/user/lib/
    +doc/
    -cat/
        head.js
        body.jd
        main.js
    +tests/
    package.json
```
其中package.json内容如下
```javascript
{
    "name":"cat",
    "main":"./lib/main.js"
}

```
如此一来，就同样可以使用require('/home/user/lib/cat')的方式加载模块。NodeJS会根据包目录下的package.json找到入口模块所在位置。
### 工程目录
了解了以上知识后，现在我们可以来完整地规划一个工程目录了。以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模式两种使用方式，并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。因此，一个标准的工程目录都看起来像下边这样。
```javascript
- /home/user/workspace/node-echo/   # 工程目录
    -bin                            # 存放命令行相关代码   
        node-echo
     +doc/                          # 存放文档
     -lib/                          # 存放API相关代码
        echo.js
     +node_modules/                 # 存放三方包
        +argv/
     +tests/                        # 存放测试用例
     package.json                   # 元数据文件
     README.md                      # 说明文件
```
其中部分文件内容：
```javascript
/* bin/node-echo */
var argv = require('argv'),
    echo = require('../lib/echo');
console.log(echo(argv.join(' ')));


/* lib/echo.js */
module.exports = function (message) {
    return message;
};

/* package.json */
{
    "name": "node-echo",
    "main": "./lib/echo.js"
}
```
以上例子中分类存放了不同类型的文件，并通过node_moudles目录直接使用三方包名加载模块。此外，定义了package.json之后，node-echo目录也可被当作一个包来使用。
小结：
使用NodeJS编写代码前需要做的准备工作，总结起来有以下几点：
- 编写前先规划好目录结构，这样才能做到有条不紊。
- 稍大些程序可以将代码拆分多个模块管理，更大一些的程序可以用包来组织代码。
- 合理使用node_modules和NODE_PATH来解耦包的使用方式和物理路径。
- 使用NPM加入NODEJS生态圈互通有无。
- 想到心仪的包名请提前到NODE抢注。
