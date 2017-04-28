 serializeArray()函数的运用
 ```javascript
function formData() {
	var $form = $('#editForm');
	var disabled = $form.find(':input:disabled').removeAttr('disabled');
	var formArr = $form.serializeArray();
	var formObjData = {};
	$.each(formArr, function() {
		formObjData[this.name] = this.value;
	});
	return formObjData;
}
 ```
 
 [Form表单详解大神参考](http://www.cnblogs.com/fish-li/archive/2011/07/17/2108884.html#_labelStart)
