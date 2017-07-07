CommonJS模块的定义:
* require()用来引入外部依赖
* exports**对象**用于导出当前对象的方法或属性，唯一的导出口
* module**对象**就代表模块本身
```javascript
// sum 模块的定义
exports.sum=function(){}
// 模块的引入
var math=require('./sum')
function add(n){
    return math.sum(val,n)
}
```
AMD:
```javascript
define(id?,dependencies?,factory)
// 依赖已数组形式传递，并以形参传入回调函数中
define(['module1','module2'],function(module1,module2){
    function foo() {
        // dosomething
      module1.test();
      module2.test();
    }
    return {foo:foo}
});
```
AMD允许输出模块规范兼容CommonJs
```javascript
define(function(require,exports,module) {
  var reqModule=require('./someModule')
  reqModule.test()
exports.test=function(){
      // dosomething
}
})
```

AMD和CMD区别：
```javascript
// AMD写法:
define(['./a','./b'],function(a,b) {
  a.test()
  b.test()
})
// CMD写法：
define(function(require,exports,module)
{
    var a=require('./a')
    a.test()
    if(status){
        var b=require('./b')
        b.test()
    }
})
```
[模块化编程](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)