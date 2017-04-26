var timelabelMap = [];
$(function () {
    var counter = 0;
    var pageStart = 0;
    var pageSize = 5;
    var isEnd = false;
    var isAjax = false;
    getData(pageStart, pageSize);
    $(window).scroll(
        function () {
            console.log("isEnd:" + isEnd + " " + "isAjax:" + isAjax);
            if (isEnd == true || isAjax == true) {
                return;
            }
            // 监听滚动函数
            if ($(document).height() - $(this).scrollTop()
                - $(this).height() < 100) {
                counter++;
                pageStart = counter * pageSize;
                getData(pageStart, pageSize);
            }
        });
    function getData(offset, size) {
        isAjax = true;
        $.ajax({
            type: 'GET',
            url: '../static/json/timeline.json',
            dataType: 'json',
            success: function (response) {
                /*						console.info(response.data);*/
                isAjax = false;
                var datas = response.data;
                var sum = response.data.length;
                if (sum - offset < size) {
                    size = sum - offset;
                }
                for (var i = offset; i < (offset + size); i++) {
                    var timelabelDay = datas[i].date.split(" ")[0];
                    var timelineItem = '<li><i class="fa fa-user bg-aqua"></i><div class="timeline-item"><span class="time"><i class="fa fa-clock-o"></i>'
                        + datas[i].date
                        + '</span><h3 class="timeline-header"><a href="#">'
                        + datas[i].author
                        + '</a><span style="padding-left: 10px;">'
                        + datas[i].title
                        + '</span></h3><div class="timeline-body">'
                        + datas[i].content
                        + '</div><div class="timeline-footer"><a class="btn btn-primary btn-xs update" style="margin-right: 3px;">修改</a><a class="btn btn-danger btn-xs delete">删除</a></div></div></li>';
                    if (isExistInArray(timelabelMap, timelabelDay)) {
                        var tag = getTagByContent($(".time-label span"), timelabelDay);
                        $(tag).parent().after(timelineItem);
                    } else {
                        timelabelMap.push(timelabelDay);
                        timelabelMap.sort().reverse();
                        var timelabel = '<li class="time-label"><span class="bg-green">'
                            + timelabelDay + '</span></li>';
                        $(".timeline").append(timelabel).append(timelineItem);
                    }
                }
                console.info(timelabelMap);
                if (size >= sum - offset) {
                    isEnd = true;
                }
            },
            error: function (xhr, type) {
                alert("Ajax Error");
            }
        });
    }

});

// 判断string example 2017-03-19 类型date是否在arr数组或者object中
function isExistInArray(arr, str) {
    if (!arr || (arr.constructor !== Array && arr.constructor !== Object)) {
        return false;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == str) {
            return true;
        }
    }
    return str in arr;
}

// tag is jqery object and str is string date example 2017-03-10 format
function getTagByContent($tag, str) {
    for (var i = 0, len = $tag.length; i < len; i++)
        if ($tag[i].innerText.toString().trim(' ') == str) {
            return $tag[i];
        }
}

// get string date from arr example 2017-03-10 寻找要插入的位置
function getTimelabelDateFromDateArray(arr, date) {
    for (var i = arr.length - 1; i < arr.length; i--) {
        if (arr[i] == date) {
            if (i == arr.length - 1) {
                return arr[arr.length - 2];
            } else {
                return arr[i + 1];
            }

        }
    }
}

// 滚动函数
function scrollTo(ele, speed) {
    if (!speed)
        speed = 300;
    if (!ele) {
        $("html,body").animate({
            scrollTop: 0
        }, speed);
    } else {
        if (ele.length > 0)
            $("html,body").animate({
                scrollTop: $(ele).offset().top
            }, speed);
    }
    return false;
}

$('.timeline').on('click', '.time-label span', function (e) {
    scrollTo($(this), 500);
    var hideToggle = $(this).parent().nextAll();
    console.info(hideToggle);
    // hideToggle.toggle('slow');
});

$('.datetimepicker').datetimepicker({
    todayBtn: "linked",
    autoclose: true,
    format: "yyyy-mm-dd hh:ii:dd",
    todayHighlight: true,
    language: "zh-CN"
});
$('#date').datetimepicker('update', getNowFormatDateSecond().toString());

// plus
$('#plus').click(function () {
    $('.modal-title')[0].innerText = "新增";
    document.getElementById("editForm").reset();
    $('#date').datetimepicker('update', getNowFormatDateSecond().toString());
    $('#author').val(user);
});

// delete
$('.timeline').on('click', '.delete', function (e) {
    if (confirm("确定删除这个记录吗 ?")) {
        var deleEle = $(this).parents().eq(2);
        var prevClassName = deleEle.prev()[0].className;
        var next = deleEle.next();
        console.log(next);
        if (((deleEle.next().length != 0 && deleEle.next().hasClass(
                'time-label')) && prevClassName == 'time-label')
            || deleEle.next().length == 0) {
            deleEle.prev().remove();
        }
        deleEle.remove();
    }
});

// update
var timelineItem = null;
var dateEle = null;
var titleEle = null;
var contentEle = null;
$('.timeline').on('click', '.update', function (e) {
    $('.modal-title')[0].innerText = "修改";
    timelineItem = $(this).parent().siblings();
    dateEle = $(timelineItem[0]);
    titleEle = $(timelineItem[1]).children("span");
    contentEle = $(timelineItem[2]);
    console.log(dateEle + ';' + titleEle + ';' + contentEle);
    $("#author").val(user);
    document.getElementById("date").value = dateEle.text();
    document.getElementById("content").value = contentEle.text().trim(" ");
    document.getElementById("title").value = titleEle.text();
    $("#editModal").modal('show');

});

// save
function save() {
    var modalTitle = $('.modal-title').text().toString();
    var title = $('#title').val().toString();
    var date = $('#date').val().toString();
    var content = $('#content').val().toString();
    var author = $('#author').val().toString();
    /*date exmaple 2017-04-24*/
    var timelabelEle = $('.time-label').children('span');
    var day = date.split(' ')[0];
    for (var i = 0; i < timelabelEle.length; i++) {
        timelabelMap[i] = timelabelEle[i].innerText.toString().trim(' ');
    }
    var timelineTmp = '<li><i class="fa fa-user bg-aqua"></i><div class="timeline-item"><span class="time"><i class="fa fa-clock-o"></i>'
        + date
        + '</span><h3 class="timeline-header"><a href="#">'
        + author
        + '</a><span style="padding-left: 10px;">'
        + title
        + '</span></h3><div class="timeline-body">'
        + content
        + '</div><div class="timeline-footer"><a class="btn btn-primary btn-xs update" style="margin-right: 3px;">修改</a><a class="btn btn-danger btn-xs delete">删除</a></div></div></li>';
    if (date.replace(/(^\s*)|(\s*$)/g, "") != ""
        && title.replace(/(^\s*)|(\s*$)/g, "") != ""
        && content.replace(/(^\s*)|(\s*$)/g, "") != "") {
        if (modalTitle == '新增' && isExistInArray(timelabelMap, day)) {
            //调用新增接口
            $("#editForm").attr("action", "../path/addData");
            var tagInsert = getTagByContent($(".time-label span"), day);
            $(tagInsert).parent().after(timelineTmp);
        } else if (modalTitle == '修改' && isExistInArray(timelabelMap, day)) {
            //调用更新接口
            $("#editForm").attr("action", "../path/updateData");
            dateEle.html(date);
            titleEle.html(title);
            contentEle.html(content);
            console.log('123');
        } else {
            //调用新增接口
            $("#editForm").attr("action", "../path/addData");
            timelabelMap.push(day);
            timelabelMap.sort().reverse();
            console.log(timelabelMap);
            var timelabelDateInsert = getTimelabelDateFromDateArray(timelabelMap, day);
            console.log(timelabelDateInsert);
            var tag = getTagByContent($(".time-label span"), timelabelDateInsert);
            var timelabelTmp = '<li class="time-label"><span class="bg-green">'
                + day + '</span></li>';
            if (timelabelDateInsert == timelabelMap[timelabelMap.length - 2]
                && day == timelabelMap[timelabelMap.length - 1]) {
                $('.timeline').append(timelabelTmp).append(timelineTmp);
            } else {
                $(tag).parent().before(timelabelTmp).before(timelineTmp);
            }
        }
        $("#editForm").submit();
        $("#editModal").modal('hide');
    }
}
