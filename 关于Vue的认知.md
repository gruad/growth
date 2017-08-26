1. 实践过程中，发现代码复用很高，数据驱动很易于理解。
2. （组件系统）利于快速迭代一个原型，有点像很早之前学习的ASP.NET的中子版和母版的思想。
3. 数据驱动，双向数据绑定。
4. MVVM（model-view-view-model）model和view完全解耦。通过类似Control的View-model实现双向数据绑定。
5. 双向数据绑定实现原理：观察者模式（观察订阅）和数据劫持。
6. 观察订阅模式是通过：observer和watcher和compile做桥梁实现的。
7. 数据劫持是通过definProperty（obj,value,config）;函数和存储属性getter和setter实现，用数据代理来达到鱼目混珠的目的。
8. 什么是虚拟DOM？
参考：
[剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)
