### 1. vue实例
11. 指令（v-）的预期值是单个JavaScript表达式，
1. 每个vue应用都是通过构造函数Vue创建的一个根实例启动的。
```javascript
var vm=new Vue({
});
```
**data是个对象。**
2. 在实例化vue时，需要传入一个选项对象{}。这个对象可以包含：数据、模板、挂载元素、方法、生命周期钩子等选项。
3. 所有的vue组件都是被扩展的Vue实例。
4. Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。
```javascript
vm.$el===document.getElementById('example');// true
```
5. 每个实例在创建之前都需要一系列的初始化。
6. 创建vm.$el，替换el（create vm.$el and replace el with it）
### 2. 模板语法
7. vue.js使用了基于HTML模板语法，它允许开发者声明式的将DOM绑定到底层vue实例的数据上。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。
8. 在底层实现上，所有vue实例都是将：模板-》编译成虚拟DOM渲染函数，结合响应系统，在应用状态改变时，Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。
如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染（render）函数，使用可选的 JSX 语法。
9.绑定的数据对象上 msg 属性发生了改变，插值处的内容都会更新。
```
<span>{{msg}}</span>
```
10. mustache ({{}})语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令:
```
<div v-bind:disabled="isDisabled"></div>
```
11. 指令（v-）的预期值是单个JavaScript表达式（v-for 是例外情况，稍后我们再讨论），
12. 指令的职责是：当表达式的值改变时，其将响应式的作用于DOM。
13.在这里href是参数，将href属性的值与表达式url的值绑定在一起。
```
<a v-bind:href="url"></a>
```
14. 另一个指令v-on用于监听DOM：参数为监听事件名。
```
<button v-on:click="doSomething"></div>
```
15. vue允许你自定义过滤器，过滤器常用于文本格式化，用在两个地方1.v-bind的表达式2.{{}}插值中，放在表达式的尾部，以管道符分割。
16.对于复杂数据的转换，应该使用计算属性。
```
<div v-bind:id="rawId|formatRawId"></div>
```
17. 在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中，
然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。
```
new Vue({
...
filters:{
  func1:function(value){
    if(!value)return " ";
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
})
```
### 3. 计算属性（computed）
18. **计算属性是基于它们的依赖进行缓存的**。计算属性只有在它的相关依赖发生改变时才会重新求值。
这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
19. Vue 确实提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：watch 属性。当你有一些数据需要随着其它数据变动而变动时，
你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，**通常更好的想法是使用 computed 属性而不是命令式的 watch 回调。**

20. 当你在数据变化是使用异步操作或开销很大是，使用watcher时很有用的。
### 4. style与calss的绑定
21. **表达式的结果类型除了字符串之外，还可以是对象或数组。**
22. v-bind:style绑定的其实是一个对象，很像CSS。直接绑定到一个样式对象通常更好，让模板更清晰
```
<div v-bind:style="styleObject"></div>
data:{
styleObject:{
 color: 'red',
 fontSize: '13px'
}
}
```
```
<div v-bind:style="{color:activeColor,fontSize:fontSize+'px'}"></div>
data:{
activeColor:'red',
fontSize:12
}
```
### 5. 条件渲染（v-if）
23. v-if是指令需要添加到元素上，但当我们想切换多个元素，可以用template元素包裹，结果不会渲染template。
```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
24. ** v-show会始终保持在DOM中，只是切换display属性值。
### 5. 列表渲染（v-for）
25. 基本用法
```html
<ul id="example-1">
<li v-for="item in items">
{{item.message}}
</li>
</ul>
data:{
items:[
  {message:"Foo"},
  {message:"Bar"}
]
}
```
26. **显示过滤/排序结果**

```
<li v-for="n in eventsNumber">{{n}}</li>
data:{
numbers:[1,2,3,4,5,6]
},
computed:{
  eventsNumber:function(){
    return this.numbers.filter(function(number){
      return number%2===0;
    });
  }
}
```
### 事件处理器
27. 基本用法:监听事件-方法事件处理器-内联事件处理器
```
<div id="example-1">
  <button v-on:click="counter += 1">增加 1</button>
  <p>这个按钮被点击了 {{ counter }} 次。</p>
</div>
data:{
  counter:0
}
```
### 6.表单控件绑定



