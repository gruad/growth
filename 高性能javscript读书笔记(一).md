# 从今天起2017-06-29开始每天都读这本书。

### (一) 加载和执行（loading and execution）。：略

### (二)  数据访问（data access）2017/6/30

  2.1 js中数据存储位置对访问速度有很大影响，js中有四种存储类型：1.直接量。2. 变量。3.数组项。4.对象成员。
  
  2.2 作用域scope，作用域链chain，标识符identifier resolution，活动对象activation（运行期上下文execution context）
  
  2.3 闭包cluster 着重理解和外部函数，既作用域链的关系和理解，常驻内存，因为一旦函数运行完，释放作用域链，但闭包的作用域链还在引用，这不会释放，直到闭       包运行完，（闭包运行时候，又会创造一个一级的活动对象active Object,搜索过程是自己的active bject ,然后外部函数的第一级active Object,然后三级全       局变量的active Object
  2.4 原型和原型链
  
### (三) DOM访问 （2017/7/3）

### (四) 算法和流程控制 （algorithms and  flow control） 
  4.1 js中有四种loop for while do-while for-in 
  4.2 js 中基于函数的迭代 forEach是面向数组对象的
  ```javascript
  items.forEach(function(value,index,array){
  process(value);
  });
  ```
  等价于jquer中的each函数
  
  ```javascript
  JQuery.each(items,function(index,value){
  process(value);
  });
  ```
  4.3 条件表达式（conditionals）
  
     4.3.1 查找表（lookup table）
     
```javascript
     var results=[result1,result2,result3,...,result11];
     return results[value];
```
     
  4.4 recurson递归和迭代
  
  合并排序
  
```javascript
  function merge(left,right){
  var result=[];
  while(left.length>0&&reght.length>0){
    if(left[0]<rigth[0]){
      result.push(left.shift());      
    }else{
      result.push(rigth.shift());
    }
  }
  return result.contat(left).contat(right);
}
function mergeSort(items){
  if(items.length==1){
    return items;
  }else{
    var middle=Math.floor(items.length/2);
    var left=items.slice(0,middle);
    var right=items.slice(middle);
    return merge(mergeSort(left),mergeSort(right));
  }
}
```
