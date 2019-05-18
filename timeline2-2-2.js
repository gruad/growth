var timelabelMap = [];// 存储timelabel
var isEnd = false;// 请求是否结束
var isAjax = false;// 是否正在ajax请求
var timeid = null;// 保存初始化setTimeout返回值
$(function() {
	var counter = 0;// 页数
	var pageStart = 0;// 起始数据项
	var pageSize = 5;// 一页五条数据
	// 初始化加载，一页五条数据，既一次加载5条
	getData(pageStart, pageSize);
	// 初始化tokenfield
	getTagsValue();
	// 滚动下拉监听
	$(window).scroll(function() {
				console.log("isEnd:" + isEnd + " " + "isAjax:" + isAjax);
				if (isEnd == true || isAjax == true) {
					return;
				}
				// 当滚动到页面底部，则加载下一页
				if ($(document).height() - $(this).scrollTop()
						- $(this).height() < 100) {
					if (!$("#noMore").length && param.length == 0) {
						$("#loading").removeClass("hide");
						delayTime(function() {
							counter++;
							pageStart = counter * pageSize;
							getData(pageStart, pageSize);
						}, 1000);
					}
					}
			});
	// 存储tokenfield选中的值
	var param = [];
	// 筛选tokenfield键入主题监听函数
	$('#search').on('tokenfield:createdtoken', function(event) {
		var tokens = $(this).tokenfield('getTokens');
		// 为了配合btn点击事件句柄
		param = [];
		for (var i = 0, len = tokens.length; i < len; i++) {
			if (param.indexOf(tokens[i].value) == -1) {
				param.push(tokens[i].value);
			}
		}
		console.log("选择的分类为：", param);
		timelabelMap = [];
		getSubjectData(param);
	});
	// 删除tokenfield之后的页面改变
	$('#search').on('tokenfield:removetoken', function(event) {
		var removeToken = $(event.relatedTarget).find("span").text();
		console.log("删除的tokenfield值是", removeToken);
		for (var i = 0, len = param.length; i < len; i++) {
			if (param.indexOf(removeToken) != -1) {
				param.splice(param.indexOf(removeToken), 1);
			}
		}
		console.log("剩下的param", param);
		getSubjectData(param);
	});
});
// 获取subject的值，填充tags并初始化tokenfield
function getTagsValue() {
	$.ajax({
		type : 'GET',
		url : '../queryPage',
		data : {
			text : 'select distinct(subject) from app_timeline;'
		},
		success : function(response) {
			var tags = [];
			for (var i = 0; i < response.length; i++) {
				tags.push(response[i].subject.replace(/(^\s*)|(\s*$)/g, ""));
			}
			var tagsValue = tags.join(",").split(",");
			console.log(tagsValue);
			//var uniqueValue = uniqueArray(tagsValue);
			var uniqueValue = tagsValue.unique();
			console.log(uniqueValue);
			// 存储所有标签对象的值
			var values = [];
			for (var i = 0; i < uniqueValue.length; i++) {
				// 构造适合local所使用的对象值
				var tagsObj = {};
				tagsObj.value = uniqueValue[i];
				values.push(tagsObj);
			}
			console.log(values);
			console.log("getTagsValue Success !");
			// 获取数据成功，则初始化 tokenfield
			var engine = new Bloodhound({
				local : values,
				datumTokenizer : function(d) {
					return Bloodhound.tokenizers.whitespace(d.value);
				},
				queryTokenizer : Bloodhound.tokenizers.whitespace
			});
			engine.initialize();
			$('#search').tokenfield({
				typeahead : [ null, {
					source : engine.ttAdapter()
				} ]
			});
			$('#subject').tokenfield({
				typeahead : [ null, {
					source : engine.ttAdapter()
				} ]
			});
		},
		error : function(xhr, type) {
			alert("init tokenfield fail !");
		}
	});
}
// getData加载一页数据函数
function getData(offset, size) {
	isAjax = true;
	$.ajax({
		type : 'GET',
		url : '../queryPage',
		data : {
			text : 'select * from app_timeline order by date desc limit '
					+ offset + ',' + size + ';'
		},
		success : function(response) {
			console.log(response);
			isAjax = false;
			$("#loading").addClass("hide");
			var len = response.length;
			appendTimelineItem(response);
			$("i[name=0]").addClass("hide");
			console.info(timelabelMap);
			if (len < size) {
				delayTime(function () {
					isEnd = true;
					showNoMore();
				}, 1000);
			}
			console.log("getData Success !");
		},
		error : function(xhr, type) {
			alert("getData Error !");
		}
	});
}

// button点击绑定搜索事件
function btnClickHandler(val) {
	$("#search").tokenfield('setTokens', val);
}
//点击timelabel滚动页面
$('.timeline').on('click', '.time-label span', function(e) {
	scrollTo($(this), 500);
});
//根据select筛选主题函数
function getSubjectData(param) {
	$.ajax({
		type : 'GET',
		url : '../queryPage',
		data : {
			text : 'select * from app_timeline order by date desc;'
		},
		beforeSend : function(xhr) {
			$(".timeline").html("");
		},
		success : function(response) {
			//console.log(response);
			// 过滤筛选处理
			var resultData = [];
			if (param.length != 0) {
				for (var i = 0; i < response.length; i++) {
					for (var j = 0; j < param.length; j++) {
						if (response[i].subject.indexOf(param[j])!=-1) {
							resultData.push(response[i]);
						}
					}
				}
				var uniqueData=resultData.unique();
				console.log("根据选择类别，返回的结果：",uniqueData);
			}else {
				for (var i = 0; i < response.length; i++) {
					resultData.push(response[i]);
				}
				var uniqueData=resultData.unique();
				console.log("没有选择时，返回的结果：",uniqueData);
			}
			timelabelMap=[];
			appendTimelineItem(uniqueData);
			// global variable value
			console.info(timelabelMap);
			$("i[name=0]").addClass("hide");
			showNoMore();
		},
		error : function(xhr, type) {
			alert("getSubjectData fail !");
		}
	});
}
//模板函数arguments为Object
function tmpl(tmplDatas) {
	var result = '<li><i class="fa fa-user bg-aqua"></i>'
			+'<div class="timeline-item"><span class="time"><span class="author">'
			+ tmplDatas.author
			+ '</span><i class="fa fa-clock-o">'
			+ tmplDatas.date
			+ '</i><i class="fa fa-flag text-red flag" name="'
			+ tmplDatas.flag
			+ '"></i></span><h3 class="timeline-header"><a href="#">'
			+ tmplDatas.title
			+ '</a><div class="border-top">'
			+subjectTagFormatter(tmplDatas.subject)
			+'</div></h3><div class="timeline-body"><a href="#">';
	if (tmplDatas.url.length != 0) {
		for (var i = 0; i < tmplDatas.url.length; i++) {
			result += '<div class="left"><img style="max-width:300px;max-height:150px;display:block;" name="img-'
					+ i + '" src="' + tmplDatas.url[i] + '"></div>';
		}
		result += '<div class="both"></div>';
	}
	result += '</a><span>'
			+ tmplDatas.content
			+ '</span><p class="hide">'
			+ tmplDatas.id
			+ '</p></div><div class="timeline-footer">'
			+'<a class="btn bg-purple btn-xs update margin-r-5">修改</a>'
			+'<a class="btn btn-danger btn-xs delete">删除</a></div></div></li>';
	return result;
}
// subject标签组格式化函数
var btnarray = [ "primary", "success", "warning", "danger" ];
function subjectTagFormatter(value) {
	var btntags = [];
	if (value != null && value != '') {
		var items = value.split(',');
		for (var i = 0, len = items.length; i < len; i++) {
			var btnid = (i + 1) % btnarray.length;
			if (btnid == 0) {
				btnid = btnarray.length - 1;
			} else {
				btnid = btnid - 1;
			}
			btntags[i] = '<button type="button" onclick="btnClickHandler(this.innerHTML)" class="tagbtn btn btn-'
					+ btnarray[btnid] + ' btn-xs">' + items[i] + '</button>';
		}
	}
	return btntags.join(" ");
}
// 追加timeline项函数
function appendTimelineItem(array) {
	// 存储timelabel背景色
	var bgColor = [ "bg-green", "bg-red-active" ];
	var len = array.length;
	for (var i = 0; i < len; i++) {
		var day = array[i].date.split(" ")[0];
		array[i]['bgColorIndex'] = array[i].flag;
		for (var j = i + 1; j < len; j++) {
			var nextDay = array[j].date.split(" ")[0];
			if ((day == nextDay) && (array[i].flag == 1 || array[j].flag == 1)) {
				array[i]['bgColorIndex'] = 1;
			}
		}
		console.log(i, "bgColorIndex", array[i]['bgColorIndex']);
	}
	for (var i = 0, len = array.length; i < len; i++) {
		var day = array[i].date.split(" ")[0];
		var timelineItemTmp = tmpl(array[i]);
		if (isExistInArray(timelabelMap, day)) {
			// 根据date找到要插入到的time-label下标签
			var dateTag = getTagByContent($(".time-label span"), day);
			$(dateTag).parent().after(timelineItemTmp);
		} else {
			timelabelMap.push(day);
			timelabelMap.sort().reverse();
			var timelabelTmp = '<li class="time-label"><span class='
					+ bgColor[array[i]['bgColorIndex']] + '>' + day + '</span></li>';
			$(".timeline").append(timelabelTmp).append(timelineItemTmp);
		}
	}
}
// 取form数据项函数
function formData() {
	var $form = $('#editForm');
	var disabled = $form.find(':input:disabled').removeAttr('disabled');
	var formArr = $form.serializeArray();
	var formObjData = {};
	$.each(formArr, function() {
		formObjData[this.name] = this.value;
	});
	formObjData['url'] = [];
	var len = $('#result').children().length;
	if (len != 0) {
		for (var i = 0; i < len; i++) {
			formObjData['url'].push($("#img" + i).attr('src'));
		}
	}
	return formObjData;
}
// 延迟执行函数
function delayTime(fn, wait) {
	// 清除定时器
	timeid && clearTimeout(timeid);
	// 定时器执行
	timeid = setTimeout(fn, wait);
}
// 多图片上传预览功能
function setImagePreviews() {
	var input = document.getElementById("file");
	var result = document.getElementById("result");
	result.innerHTML = "";
	var fileList = input.files;
	for (var i = 0; i < fileList.length; i++) {
		result.innerHTML += "<div class='left'><img id='img" + i
				+ "' alt='" + fileList[i].name + "'/></div>";
		var imgObjPreview = document.getElementById("img" + i);
		// image/png or image/jpg
		console.log(fileList[i].type);
		if (fileList && fileList[i]) {
			// 控制上传类型必须是图片
			if (!(/image\/\w+/).test(fileList[i].type)) {
				alert("上传文件类型必须为图片！请重新选择上传文件。");
				input.value = "";
				$("#result").html("");
				return false;
			} else {
				// 火狐谷歌下，直接设img属性
				imgObjPreview.style.display = 'block';
				imgObjPreview.style.width = '150px';
				imgObjPreview.style.height = '180px';
				// createObjectURL 性能比FileReader效果好，决定用createObjectURL
				// 兼容Safari和Chrome
				imgObjPreview.src = window[window.webkitURL ? 'webkitURL'
						: 'URL'].createObjectURL(fileList[i]);
				imgObjPreview.onload = function(e) {
					window.URL.revokeObjectURL(fileList[i]);
				}
			}
		} else {
			// IE下，使用滤镜
			// 测试因IE9（包含IE9）以下浏览器不包含files，所以不兼容会报错，需IE9以上版本
			input.select();
			var imgSrc = document.selection.createRange().text;
			alert(imgSrc);
			var localImagId = document.getElementById("img" + i);
			// 必须设置初始大小
			localImagId.style.width = "150px";
			localImagId.style.height = "180px";
			// 图片异常的捕捉，防止用户修改后缀来伪造图片
			try {
				localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
				localImagId.filters
						.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
			} catch (e) {
				alert("您上传的图片格式不正确，请重新选择!");
				return false;
			}
			imgObjPreview.style.display = 'none';
			document.selection.empty();
		}
	}
	return true;
}

// plus
$('#plus').click(function() {
	$('.modal-title')[0].innerText = "新增";
	$("#editForm")[0].reset();
	$("#result").html("");
	$('#date').removeAttr('disabled');
	$('#date').datetimepicker('update', getNowFormatDateSecond().toString());
	$('#author').val(user);
	$('#flag').selectpicker('val', 0);
});
// delete
$('.timeline').on('click','.delete',function(e) {
		var id = $($(this).parents().prev()[0]).find("p").text();
		console.log(id);
		var deleEle = $(this).parents().eq(2);
		var prevClassName = deleEle.prev()[0].className;
		var next = deleEle.next();
		if (confirm("确定删除这个记录吗 ?")) {
		$.ajax({
			type : "GET",
			url : "../queryPage",
			data : {
				text : 'delete from app_timeline where id='
						+ id
			},
			success : function() {
					if (((deleEle.next().length != 0 && deleEle
							.next().hasClass('time-label')) && prevClassName == 'time-label')
							|| deleEle.next().length == 0) {
						deleEle.prev().remove();
					}
					deleEle.remove();
				console.log("delete Success !");
			},
 		   error : function(xhr, type) {
				alert("delete Error !");
			}
		});
	}
});
// update
var timelineItem = null;
$('.timeline').on('click','.update',function(e) {
	$('.modal-title')[0].innerText = "修改";
	$("#editForm")[0].reset();
	// 8个字段
	timelineItem = $(this).parent().siblings();
	$('#date').val($(timelineItem[0]).children(":eq(1)").text());	
	var tags=$(timelineItem[1]).find("button");
	// 存储tags的值
	var tagsValue=[];
	for(var i=0,len=tags.length;i<len;i++){
		tagsValue.push(tags[i].innerHTML);
	}
	$('#subject').tokenfield('setTokens', tagsValue);
	$('#content').val($(timelineItem[2]).find('span').text());
	$('#id').val($(timelineItem[2]).find('p').text());
	$('#title').val($(timelineItem[1]).find('a').text());
	$("#author").val(user);
	$("#flag").selectpicker('val',$(timelineItem[0]).children(":eq(2)").attr("name"));
	// input img值带到弹出框中 2017/5/13 未解决todo (已解决2017/5/15)(修改2017/5/23)
	$("#result").html("");
	var len=$(timelineItem[2]).find('img').length;
	if (len != 0) {
		var url = [];
		$(timelineItem[2]).find('img').each(
				function(index, value) {
					url.push($(value).attr("src"));
				});
		for (var i = 0; i < url.length; i++) {
			$("#result").append('<div class="left">'
							+'<img style="max-width:150px;max-height:180px;display:block;" id="img'
							+ i
							+ '" src="'
							+ url[i]
							+ '"></div>');
			}
	}
	$("#date").attr("disabled", true);
	$("#editModal").modal('show');
});
// save
function save() {
	var modalTitle = $('.modal-title').text().toString();
	var formObj = formData();
	// 存储timelabel背景色
    var bgColor=["bg-green","bg-red-active"];
	var day=formObj.date.split(' ')[0];
	var timelabelTmp = '<li class="time-label"><span class='
			+ bgColor[formObj.flag - 0] + '>' + day + '</span></li>';
	var timelineItemTmp = tmpl(formObj);
	if (formObj.subject.replace(/(^\s*)|(\s*$)/g, "") != ""
			&& formObj.title.replace(/(^\s*)|(\s*$)/g, "") != ""
			&& formObj.content.replace(/(^\s*)|(\s*$)/g, "") != ""){
	if (modalTitle == '新增'&& isExistInArray(timelabelMap, day)) {
		// 调用新增接口
		$.ajax({
				type : "GET",
				url : "../queryPage",
				data : {
					text:'insert into app_timeline (date,subject,title,content,author,flag,url) values ("'
					+ formObj.date+'","'
					+ formObj.subject+'","'
					+ formObj.title+'","'
					+ formObj.content+'","'
					+ formObj.author+'","'
					+ formObj.flag+'","'
					+ formObj.url+'"'
					+ ');'
				},
				success : function(datas) {
					var tagInsert = getTagByContent($(".time-label span"), day);
					$(tagInsert).parent().after(timelineItemTmp);
					console.log("insert Ok !");
				},
				error : function(xhr, status, e) {
					alert("insert Error !");
				}
			});
		// 必须刷新页面，否则id无法渲染，则导致新增的无法删除和修改
		refreshCurrentPage();
	} else if (modalTitle == '修改') {
		var id=$(timelineItem[2]).find('p').text();
		console.log(id);
		// 调用修改接口
		$.ajax({
			type : "GET",
			url : "../queryPage",
			data : {
				text : 'update app_timeline set subject="'
						+ formObj.subject + '", title="'
						+ formObj.title + '", content="'
						+ formObj.content + '", flag="' 
						+ formObj.flag+ '", url="' 
						+ formObj.url +'" where id=' 
						+ id
			},
			success:function(){
				// 有点问题-todo-更新的时候数据带不过来，然后回写（7个字段id不用写回）的时候尽然没有覆盖 (已解决2017/5/15)(修改2017/5/23)
				$(timelineItem[2]).find('a').html("");
				if (formObj.url.length != 0) {
					for (var i = 0; i < formObj.url.length; i++) {
					$(timelineItem[2]).find('a').append(
									'<div class="left"><img style="max-width:300px;max-height:150px;display:block;" name="img-'
									+ i
									+ '" src="'
									+ formObj.url[i]
									+ '"></div>');
					}
				$(timelineItem[2]).find('a').append('<div class="both"></div>');
				}
				console.log("update Success !");
			},
			error:function(xhr,type){
				alert("update Error !");
			}
		});
		refreshCurrentPage();
	} else {
		// 调用新增接口
		$.ajax({
			type : "GET",
			url : "../queryPage",
			data : {
				text:'insert into app_timeline (date,subject,title,content,author,flag,url) values ("'
				+ formObj.date+'","'
				+ formObj.subject+'","'
				+ formObj.title+'","'
				+ formObj.content+'","'
				+ formObj.author+'","'
				+ formObj.flag+'","'
				+ formObj.url+'"'
				+ ');'
			},
			success : function(datas) {
				timelabelMap.push(day);
				timelabelMap.sort().reverse();
				var timelabelDateInsert = getInsertLocation(timelabelMap, day);
				console.info("当前timelabel包含的值："+timelabelMap);
				console.info("插入位置："+timelabelDateInsert);
				var tag = getTagByContent($(".time-label span"),timelabelDateInsert);
				// 如果要插入的day在timelabelMap数组中最后一个，找到要插入的timelabelDate是倒数第二个，则如下插入到最后即可
				// 否则先插入timelabel 然后插入timelineItem
				(timelabelDateInsert == timelabelMap[timelabelMap.length - 2] && day == timelabelMap[timelabelMap.length - 1]) ? 
				$('.timeline').append(timelabelTmp).append(timelineItemTmp): 
				$(tag).parent().before(timelabelTmp).before(timelineItemTmp);
				console.log('insert Success !');
			},
			error : function(xhr, status, e) {
				alert("insert Error");
			}
		});
		// 必须刷新页面，否则id无法渲染，则导致新增的无法删除和修改
		refreshCurrentPage();
	}
	$("#editModal").modal('hide');
 }
}
