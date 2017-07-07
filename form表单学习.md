 serializeArray()函数的运用
 
 ### 1. 浏览器提交表单
 分四个步骤：
     1. 识别成功控件。
     2. 生成对应的name、value集合。
     3. 根据Content-type指定的类型进行编码。
     4. 提交编码后的数据，区分post和get，提交地址由action决定。
     
 ### 2. javascript提交表单
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
