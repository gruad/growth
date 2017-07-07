<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>Version 2-1 timeline</title>
<!-- style -->
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" href="<c:url value='/static/css/bootstrap/bootstrap.min.css'/>">
<link rel="stylesheet" href="<c:url value='/static/css/bootstrap/bootstrap-datetimepicker.css'/>">
<link rel="stylesheet" href="<c:url value='/static/css/bootstrap/bootstrap-select.min.css'/>">
<!-- add -->
<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/assets/AdminLTE.css'/>">
<!-- Tokenfield CSS -->
<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/assets/bootstrap-tokenfield.css'/>">
<!-- Bootstrap styling for Typeahead -->
<!--  .twitter-typeahead .tt-input,
.twitter-typeahead .tt-hint {
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.428571429;
} 注释掉了这段代码，不然输入框样式略大略丑 -->
<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/assets/tokenfield-typeahead.css'/>">
<!-- timeline -->
<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/assets/timeline.css'/>">
<!-- style -->
<!-- script -->

<script type="text/javascript" src="<c:url value='/static/js/assets/jquery.min-3.1.1.js'/>"></script>
<script type="text/javascript" src="<c:url value='/static/js/bootstrap/bootstrap.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/static/js/assets/app.js'/>"></script>
<!-- tokenfield -->
<script type="text/javascript" src="<c:url value='/static/js/assets/bootstrap-tokenfield.js'/>"></script>
<!-- typeahead -->
<script type="text/javascript" src="<c:url value='/static/js/assets/typeahead.bundle.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/static/js/bootstrap/extensions/bootstrap-datetimepicker.js'/>"></script>
<script type="text/javascript" src="<c:url value='/static/js/bootstrap/extensions/bootstrap-datetimepicker.zh-CN.js'/>"></script>
<script type="text/javascript" src="<c:url value='/static/js/bootstrap/extensions/bootstrap-select.min.js'/>"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.js"></script>

</head>
<body>
   <div class="container content-back" >
            <!-- Main content -->
            <section class="content">
			<!-- row -->
			<div class="row">
				<div class="col-md-6">
					<button id="plus" type="button" class="btn btn-ms bg-aqua"
						data-toggle="modal" data-target="#editModal">
						<i class="fa fa-plus"></i>新增
					</button>
				</div>
				<div class="col-md-6">
			    <div class="right input-group ">
					<input type="text" class="form-control" id="search" placeholder="搜索分类" autocomplete="off" />
				</div>
				<div class="clear-both"></div>
				</div>
			</div>
			<div class="row my-top">
                    <div class="col-md-12">					
					<!-- The time line -->
					<ul class="timeline">
					</ul>
					</div>
            </div>
			<!-- /.row -->
            </section>
            <!-- /.content -->
    </div>

	<!-- Loading -->
	<div class="loading hide" id="loading">
		<div class="load-image"></div>
		<span>正在加载更多</span>
	</div>

	<!-- 点击新增的弹出框 -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h5 class="modal-title">新增</h5>
			</div>
			
			<div class="modal-body">
				<form data-toggle="validator" id="editForm" target="iframe1" class="form-horizontal" enctype="multipart/form-data">					
					
					<div class="form-group">
						<label class="col-xs-3 control-label">日期：</label>
						<div class="col-xs-7">
							<input type="text" class="form-control datetimepicker" name="date" id="date"/>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-xs-3 control-label">类别：</label>
						<div class="col-xs-7">
							<input type="text" placeholder="请按Enter,完成输入" autocomplete="off" class="form-control" name="subject" id="subject" data-error="类别不能为空，请填写类别" required/>
							<div class="help-block with-errors"></div>
						</div>
					</div>

						<div class="form-group">
							<label class="col-xs-3 control-label">标题：</label>
							<div class="col-xs-7">
								<input type="text" placeholder="新标题" autocomplete="off"
									class="form-control" name="title" id="title"
									data-error="标题不能为空，请填写标题" required />
								<div class="help-block with-errors"></div>
							</div>
						</div>

						<div class="form-group">
						<label class="col-xs-3 control-label">内容：</label>
						<div class="col-xs-7">
							<textarea rows="15" class="form-control" placeholder="请输入内容" autocomplete="off" name="content" id="content" data-error="内容不能为空，请填写内容" required></textarea>
							<div class="help-block with-errors"></div>
						</div>
					</div>
					
					<div class="form-group hide">
						<label class="col-xs-3 control-label" >作者：</label>
						<div class="col-xs-7">
							<input type="text" class="form-control" name="author" id="author" disabled/>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-xs-3 control-label">标记：</label>
						<div class="col-xs-7">
								<select type="text" class="selectpicker form-control" name="flag" id="flag">
								<option value="0">F</option>
								<option value="1">T</option>
								</select>
						</div>
					</div>

						<div class="form-group">
							<label class="col-xs-3 control-label">图片：</label>
							<div class="col-xs-7">
								<input type="file" name="file" id="file" multiple="multiple"
									onchange="javascript:setImagePreviews();" accept="image/*" />
								<div id="result"></div>
							</div>
						</div>
						
					<div class="form-group hide">
						<label class="col-xs-3 control-label" >ID：</label>
						<div class="col-xs-7">
							<input type="text" class="form-control" name="id" id="id" disabled/>
						</div>
					</div>

						<div class="form-group">
						<div class="col-xs-5 col-xs-offset-3">
							<button type="submit" class="btn btn-primary" onclick="save()">确定</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<iframe id="iframe1" name="iframe1" class="hide"></iframe>
<!-- script -->
<script type="text/javascript">
var user='${user.fullName}';
</script>
<script type="text/javascript" src="<c:url value='/static/js/assets/newapp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/static/js/assets/timeline2-2-2.js'/>"></script>
</body>
</html>