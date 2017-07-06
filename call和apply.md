fuck，一直记不住这两个函数的使用
### 作用：

1. 使用方法 ({}).hasOwnProperty.call(thisObj,var1); 
Array.prototype.slice.call(arguments);(性能不好，不推荐)

```javascript
function foo(){
  bar.apply(null,arguments);
}
function bar(a,b,c){
}
```
2. 继承属性和方法

**编者按：这样我们就可以根据各个不同的功能模块分不同的程序员独立开发，最后合并起来，实现了多重继承**

call:

　　语法：call([thisObj[,arg1[, arg2[, [,.argN]]]]])

　　参数 thisObj 可选项。将被用作当前对象的对象。 arg1, arg2, , argN 可选项。将被传递方法参数序列。
  
apply:

    语法：apply([thisObj[,argArray]]) 
    
　　定义：应用某一对象的一个方法，用另一个对象替换当前对象。 
  
  　说明： 
   
　　如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 
  
　　如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。
  
  ### 实例
  ```javascript
  function Cat() {
    this.food = "fish";
    Cat.prototype.say = function () {
        alert(this.food);
    }
}
var cat1 = new Cat();
cat1.say();// fish
var dog = {food: "bone"};
cat1.say.call(dog);//bone
  ```
  ```javascript
  var value = "global var";
function mFunc() {
    this.value = "member var";
}
function globalFunc() {
    alert(this.value);
}
globalFunc();//global var
globalFunc.call(window);//global var
globalFunc.call(new mFunc());//member var
  ```
  ```javascript
  var ainimals = [{name: "dog", age: "2"}, {name: "cat", age: "4"}];
for (var i = 0; i < ainimals.length; i++) {
    var func1 = function (i) {
        this.print = function () {
            console.log("#" + i + " " + this.name + " " + this.age);
        }
        this.print();
    }
    func1.call(ainimals[i], i);
}
// #0 dog 2
// #1 cat 4
// 去掉函数func1的参数i，call去掉i也是也可以的
  ```
