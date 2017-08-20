妈的，基础基础基础

# 总结面试中的基础知识，仅供自己参考查阅

-1. CSS -2. HTML -3. JavaScript -4. Vuejs -5. Nodejs
### 1.块级标签和行内标签的区别？（在标准文档流中）:难记点如何记忆什么是行内标签——行内行内，一行内多个
答：区别

1.块级标签独占一行，行内标签排列在同一行。

2.块级标签可以设置width和height（块级元素即使设置宽度也还是独占一行），行内标签设置无效。

3.块级标签可以设置margin和padding。而行内元素设置的margin和padding在垂直方向上不起作用。

4.可以互换块级标签和行内标签：通过dispaly：inline，block，inline-block。

5.inline-block即具有行内标签的属性又有块级标签的属性。

**使用注意事项：块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素。**
[重要区别](https://github.com/qiu-deqing/FE-interview#display-block%E5%92%8Cdisplay-inline%E7%9A%84%E5%8C%BA%E5%88%AB)
[参考1](http://www.cnblogs.com/malinlin/p/4800683.html)
[参考2](http://blog.csdn.net/sykent/article/details/7738408)
### 2. 盒模型
答：

1。分标准盒模型width只是content的宽。整个宽allWidth=width+padding*2+border*2+margin*2。而早期IE5.6等width就是整个盒子的宽度boxWidth。

### 3. position：fixed absolute relative static 
答：

1. static 它还在正常的文档流中，设置top等无用（不会移动）

2. fixed 它相对浏览器窗口定位，即使滚动，它也不动。

3. relative 它还在文档流，设置top等有效，但它在正常文档流（移动前的位置）中的位置还是保留的。* *（相对定位元素经常被用来作为绝对定位元素的容器块。）**

4. absolute 它脱离文档流，原来站的位置不保留，它相对于最近定位的父元素定位，如果没有定位的元素，则相对于Html标签。
**absolute 定位的元素和其他元素重叠，所以使用z-index觉得层次**

### 4. flaot 浮动:left rigth,none,inherit
答：

浮动也是布局的一种方式（**脱离文档流，不占原来位。div改变成inline-block 行内元素改变成block**），多用于图片，作用在左右方向，对于应用浮动的标签，会影响其后面的元素重新布局（表现为环绕），前面的不影响。用于clear：both清除浮动的影响。clear:指定不允许元素周围有浮动元素。both,left,right,none,inherit

### 5. 水平&垂直居中的方案
总结的太好了，条理清晰，记住所有的都是相对父元素。子元素分定宽高和不知道宽高用calc（表达式计算）:表达式中+-以空格分割
display:flex需要配合align-items:center实现居中justify-content:center(在x轴上的对齐方式)
[把简单做好也不简单-css水平垂直居中](https://xdlrt.github.io/2016/12/15/2016-12-15/)
[以图片为子元素的居中和垂直](http://www.jianshu.com/p/a7552ce07c88?winzoom=1)
calculate [ˈkælkjəˌlet] vt&vi..计算;估计;打算，计划;旨在
[calc](http://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)
[以图片为子元素的居中和垂直](http://www.jianshu.com/p/a7552ce07c88?winzoom=1)
[以图片为子元素的居中和垂直](http://www.jianshu.com/p/a7552ce07c88?winzoom=1)
### GET和POST
面试回答：首先他们都是http中干建筑method的值，简单点儿说，一个用于获取数据，一个用于修改数据。都是与服务器交互的，具体的请参考RFC文档。我看过他们的rfc文档。网上有很多关于传递传递html中的区别，1.get附加在url上，post附件中body中。2.get因为附加在url上，所以url有长度限制(服务器也不傻，给个很长的url增加负担解析时间，所以也会限制)，2048个字符。body没有，所以post没有。3.安全上get因为附加在url，虽然可以encode但是还是不安全，而post在body中安全些，当然相对的啊，可以抓包。4.服务端获取GET请求参数用Request.QueryString，post获取是request.Form。5.get请求会被缓存，post不会。
request for comments
[RFC文档get](https://tools.ietf.org/html/rfc2616#section-9.3)
[RFC文档post](https://tools.ietf.org/html/rfc2616#section-9.5)
[不再以讹传讹，GET和POST的真正区别](http://www.cnblogs.com/nankezhishi/archive/2012/06/09/getandpost.html)
[浅谈HTTP中Get与Post的区别](http://www.cnblogs.com/hyddd/archive/2009/03/31/1426026.html)
[99%...](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd)

### HTTP缓存（浏览器缓存机制）
我的理解：reponse header中和缓存有关的字段。1.cache-control(expries)2.Last-modified3.ETag4.Vary(Accept-Encoding)
request header中和缓存有关的字段:1.if-modified-Since(if-no-modified)=last-modified2.if-match(if-no-match)=ETag
1.主要还是基于http请求和回应。**当然最重要的要看requestheader的设置cache-Control:no-cache（expires是1.0中的会被覆盖。）**
还有就是刷新F5是直接跳过缓存的，直接请求服务器。浏览器一般会先查看是否过期，然后判断资源是否更新。

2.第一次请求一个路径下的index.html。服务器会返回（reponse header中）三个和缓存有关的字段：1.过期时间expries。2.文件最后修改时间Last-modified。3.根据返回的文件内容生成的Entity Tag简写：ETag。

3.就是第二次请求的过程（request header），如果没有过期，就直接使用缓存的（from cache）。

4.（**判断资源是否更新**）如果过期了，就发起request请求，把1.文件修改时间（Last-modified）2.ETag，发给服务器对比，如果都没有变，这服务器返回304，直接利用缓存。

5.如果有一个变化，这重新返回，同过程2，写入三个主要字段。

[浏览器HTTP缓存原理分析](http://www.cnblogs.com/tzyy/p/4908165.html)
[浏览器缓存机制剖析](http://web.jobbole.com/91084/?utm_source=blog.jobbole.com&utm_medium=relatedPosts)
[彻底弄懂 Http 缓存机制 - 基于缓存策略三要素分解法](https://mp.weixin.qq.com/s?__biz=MzA3NTYzODYzMg==&mid=2653578381&idx=1&sn=3f676e2b2e08bcff831c69d31cf51c51&key=dde62796d24517c892043e67f2520e046c13fc0558822ef7ba7fbe8003ddde05e22230fb4ccb2c31133df2a507940c5d4561c7b4f4570969a47cf1388ff57e4bfea70a3810f3fc805e2a5d9aa3192439&ascene=0&uin=MTM4MjU5NzA0MA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G1212)&version=12010110&nettype=WIFI&fontScale=100&pass_ticket=n3plsW%2FV7Vb6O9hKzPNig5MYpXUoJo3tNUNxhJ5Jh6e9AS%2BRXmvJPbIzUeUmL3S2)

