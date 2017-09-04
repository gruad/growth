```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>点击回到顶部</title>
    <style type="text/css">
        .wrap ul li {
            height: 80px;
            line-height: 80px;
        }
        #go-top{
            position: fixed;
            bottom: 10px;
            right: 10px;
            border:1px solid red;
            padding: 10px;
            cursor: pointer;
            display: none;
        }
    </style>
</head>
<body>
<div class="wrap">
    <ul>
        <li>内容顶部0</li>
        <li>内容1</li>
        <li>内容2</li>
        <li>内容3</li>
        <li>内容4</li>
        <li>内容5</li>
        <li>内容6</li>
        <li>内容7</li>
        <li>内容8</li>
        <li>内容9</li>
        <li>内容10</li>
        <li>内容11</li>
        <li>内容12</li>
        <li>内容13</li>
        <li>内容14</li>
        <li>内容15</li>
        <li>内容16</li>

    </ul>
</div>
<script
        src="https://code.jquery.com/jquery-3.2.1.slim.js"
        integrity="sha256-tA8y0XqiwnpwmOIl3SGAcFl2RvxHjA8qp0+1uCGmRmg="
        crossorigin="anonymous"></script>
<script type="text/javascript">
    var goTop = (function () {
        // 创建一个按钮
        var $btn = $('<button id="go-top">回到顶部</button>');
        // 追加到document上
        $('body').append($btn);

        function init() {
            $(window).on('scroll',function () {
                // 滚动条距离document的顶部高度（卷上去的高度）
                var scrollTop = $('body').scrollTop();
                if (scrollTop > 100) {
                    $btn.show();
                } else {
                    $btn.hide();
                }
            });

            $btn.on('click',function () {
                $(window).scrollTop(0);
            })

        }

        return {
            init: init
        }
    })();

    goTop.init();

</script>
</body>
</html>
```
