妈的，基础基础基础

# 总结面试中的基础知识，仅供自己参考查阅

- ### 1. CSS
- ### 2. HTML
- ### 3. JavaScript
- ### 4. Vuejs
- ### 5. Nodejs
#### 1.块级标签和行内标签的区别？（在标准文档流中）:难记点如何记忆什么是行内标签——行内行内，一行内多个
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
#### 2. 盒模型
答：

1。分标准盒模型width只是content的宽。整个宽allWidth=width+padding*2+border*2+margin*2。而早期IE5.6等width就是整个盒子的宽度boxWidth。

#### 3. position：fixed absolute relative static 
答：

1. static 它还在正常的文档流中，设置top等无用（不会移动）

2. fixed 它相对浏览器窗口定位，即使滚动，它也不动。

3. relative 它还在文档流，设置top等有效，但它在正常文档流（移动前的位置）中的位置还是保留的。* *（相对定位元素经常被用来作为绝对定位元素的容器块。）**

4. absolute 它脱离文档流，原来站的位置不保留，它相对于最近定位的父元素定位，如果没有定位的元素，则相对于Html标签。
**absolute 定位的元素和其他元素重叠，所以使用z-index觉得层次**

### 4. flaot 浮动:left rigth,none,inherit
答：

浮动也是布局的一种方式（**脱离文档流，不占原来位。div改变成inline-block 行内元素改变成block**），多用于图片，作用在左右方向，对于应用浮动的标签，会影响其后面的元素重新布局（表现为环绕），前面的不影响。用于clear：both清除浮动的影响。clear:指定不允许元素周围有浮动元素。both,left,right,none,inherit

#### 5. 水平&垂直居中的方案
总结的太好了，条理清晰，记住所有的都是相对父元素。子元素分定宽高和不知道宽高用calc（表达式计算）:表达式中+-以空格分割
display:flex需要配合align-items:center实现居中justify-content:center(在x轴上的对齐方式)
[把简单做好也不简单-css水平垂直居中](https://xdlrt.github.io/2016/12/15/2016-12-15/)
[以图片为子元素的居中和垂直](http://www.jianshu.com/p/a7552ce07c88?winzoom=1)
calculate [ˈkælkjəˌlet] vt&vi..计算;估计;打算，计划;旨在
[calc](http://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)


