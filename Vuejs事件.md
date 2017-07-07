
### 1. $on(eventName)监听事件 $emit(eventName)触发事件
```javascript
<div id="example">
<p>{{total}}</p>
// 监听子组件里的事件increment
<increment-counter v-on:increment="incrementTotal"></increment-counter>
<increment-counter v-on:increment="incrementTotal"></increment-counter>
</div>
<script type="text/javascript">
Vue.component("increment-counter",{
  template:'<button v-on:click="increment">{{counter}}</button>',
  data:function(){
    return {
      counter:0
    }
  },
  methods:{
    increment:function(){
      this.counter+=1;
      // 触发事件increment
      this.$emit('increment');
    }
  }
})

new Vue({
  el:"#example",
  data:{
    total:0
  },
  methods:{
    incrementTotal:function(){
        this.total+=1
    }
  }
})
</script>
```
**在子组件里触发事件，在父组件里监听事件。**
**子组件和外部完全解耦，它所做的只是报告自己的内部事件。至于父组件是否关心与它无关**

### 2. <input v-model="something"> 

相当于 ```<input v-bind:value="something" v-on:input="something=$event.target.value">```

在组件中相当于： ```<custom-input v-bind:value="something" v-on:input="something=arguments[0]"></custom-input>```
