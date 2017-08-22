### 1. typeof(0)==='number'
### 2. Object.prototype.toString.call(0)==='[object Number]'

# 使用 hasOwnProperty 方法判断属性是否存在:返回布尔值
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
用法：
```javascript
Object.hasOwnproperty('someProperty')
```
1.该方法区别自有属性和原型链上属性。
```javascript
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
```

2. js不保护hasOwnproperty关键字。
```javascript
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```
