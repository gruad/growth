 问题：
 1. content的内容如何自适应而不是设置固定的高度。
 2. 点击左侧的导航栏的a，在右侧的content添加页面和tabs的时候，如何点击一次，只添加一个，已存在就无需添加。
 
 解决：
 
 问题1. 利用contain-wrapper.height()-section.offsetTop>iframe.height()条件，来重置iframe的高度
 
 问题2. 利用$('#homeTabs a:contains("+$(this).text()+")').lenght==0这个条件，来选择是否添加addHomeTabs();

new :

1. closest()
2. index()
3. location.hash [hash问题](http://forum.jquery.com/topic/this-hash)
