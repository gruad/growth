**Number.toString(bit)---数字转换成字符，按bit基为准，bit等于2，则换成成2进制**Number为10进制。
parseInt返回的为10进制的数，没有基则另算，根据位数是否为Number类型计算。
比如：
var iNum1 = parseInt("AF", 16);	//返回 175
var iNum1 = parseInt("10", 2);	//返回 2
var iNum2 = parseInt("10", 8);	//返回 8
var iNum3 = parseInt("10", 10);	//返回 10
**parseInt(String,bit)---字符串转换成数字，按bit基为准，bit等于2，则转换成2进制对应的数字。**
特别的：如果十进制数包含前导 0，那么最好采用基数 10，这样才不会意外地得到八进制的值。
例如：
var iNum1 = parseInt("010");	//返回 8
var iNum2 = parseInt("010", 8);	//返回 8
var iNum3 = parseInt("010", 10);	//返回 10
### 参考
[ECMAScript类型转换](http://www.w3school.com.cn/js/pro_js_typeconversion.asp)
