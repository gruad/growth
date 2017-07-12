### 1. 首页改版
关键词：bootstrap nav-tab iframe AdminLTE框架 导航树tree

工作内容：中间自己没有使用框架的时候，曾自己构造tree.

面试回答：改版easyUI的首页，左侧菜单栏tree结构，右侧内容页，类似网易邮箱那种，点击左侧菜单栏，右侧加载一个页面（添加一个nav-tab和tab-content），页面折叠排列，包含nav-tab,tab-content，页面放在iframe中，页面加载进来的高度调整为适应大小。

遇到难点：1. content-warpper中的content中iframe的高度问题，既页面载入大小问题。2. 点击左ul>li>a时候，右边反复添加。

解决方法：1.根据iframe的高度是否小于右侧content-wrapper的高度减去右侧tab-content距离页面底部的高度来触发$(window).resize()方法调整页面高度。
         2.当tab中的不存在时候，再调用addHomeTabs函数添加。

右侧结构：
```html
<div class="content-warpper">
 <section class content-header>
   <ul class="nav nav-tab>
     <li></li>
   </ul>
 </section>
 <section content tab-content>
   <div><iframe></iframe></div>
 </section>
</div>
```

代码1：
```javascript
        $(window).resize(function () {
            if ($('iframe').height() < ($('.content-wrapper').height() - $('iframe').closest('section')[0].offsetTop))
                $('iframe').height($('.content-wrapper').height() - $('iframe').closest('section')[0].offsetTop)
        });
```
代码2：
```javascript
 if ($('#homeTabs a:contains(" + $(this).text() + ")').length == 0) {
                    var targetUri = $(this).attr("href");

                    addHomeTabs($(this).text(), targetUri);
                }
```
### 2. 智库实现
关键词：modal模拟框 bootstrap-tagsinput制作标签 bootstrap-table ajax 分页（前端分页，一次请求全部数据）tooltips 弹出框popover

工作内容：中间自己摸索一段时间

面试回答：做的是一个用来记录项目组的成员记录公告或存放文件的页面，类似公告一样，主要是bootstrap-table布局展示，作者，日期，事项，标签啦，附件啦等等
         ，可以增删改查。

遇到难点：1.修改的时候，有附件则带不过去，就是modal中，只能给附件处一个提示，提交则覆盖。

解决方法：暂未解决。

代码：
```javascript
    // 附件列格式化
    function attachmentFormatter(value, row, index) {
        var a = '';
        var arr = ["jpg", "jpeg", "png", "gif", "bmp"];
        if (value != null && value != '') {
            if (arr.toString().indexOf(value.split(".")[1]) > -1) {
                a = ['<a href="../docUtil/download-document-billboard-' + row['docId'] + '" title="' + value + '">'
                    ,'<i class="glyphicon glyphicon-picture" style = "font-size:30px;"></i>',
                    '</a>'].join('');
            } else {
                a = ['<a class="file" href="../docUtil/download-document-billboard-' + row['docId'] + '" title="' + value + '">'
                    ,'<i class="glyphicon glyphicon-file" style = "font-size:30px;"></i>',
                    '</a>'].join('');
            }
        }
        return a;
    }
```

### 3. 时间轴实现
关键词：

工作内容和收获：

面试回答：

遇到难点和解决方法：

### 4. 其他待补充
所用技术：

关键词：

工作内容和收获：

面试回答：

遇到难点和解决方法：

