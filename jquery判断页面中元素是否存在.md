### 一定要用$("cssSelector").length,一定不能用$("cssSelector")
```javascript
$("cssSelector")// 即使不存在也会返回一个对象
```
```javascript
$("cssSelector").length// 返回一个一个number
```
