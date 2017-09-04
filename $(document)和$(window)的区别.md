区别：

1. $(window).height()是可是窗口的高度。它会随窗口改变而改变。
2. $(document).height()是整个文档的高度。它不会改变。

```javascript
// 函数判断是否进入可视区
function isVisiable($node){
// 窗口卷上去的高度（即滚动条拒页面顶部的距离。）
var scrollHeight=$(window).scrollTop();
// 可视化窗口的高度
var windHeight=$(window).height();
// 元素距离document的上边的距离，而不是浏览器当前窗体的上边缘
var offsetTop=$(window).offset().top;
if(offsetTop<windHeight+scrollHeight){
  return ture;
  }else{
  return false;
  }
}

```
