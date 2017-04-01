1. v-bind 参数
v-bind:href="url" 

在这里 href 是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。

2. 修饰符

v-bind:submit.prevent="dosomething" 

.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault();

3. computed VS methods

```javascript

computed:{
reversedMessage:function(){
  return this.message.split("").reverse().join("");
}
}

computed:{
  now:function(){
    return new Date();
  }
}

methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

1. 计算属性是基于依赖关系的，message更新才计算，method则每次都重新计算。
2. 计算属性是基于它们的依赖进行缓存的。
3. 调用也不同computed的：```<p>{{reversedMessage}}</p>``` ，methods的：```<p>{{reversedMessage()}}</p>```

4. v-show

![](https://github.com/gruad/growth/blob/master/images/v-show.png)

5. method

**methods只有纯粹的数据逻辑，而不是去处理DOM事件细节。**

