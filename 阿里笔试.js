/**
 * Created by xianfengliu on 2017/4/25.
 */
var arr=[['小猫','小狗'],['12','13']];
输出:newArr=[
    ['小猫','12'],
    ['小猫','13'],
    ['小狗','12'],
    ['小狗','13']
];
```
var array = [['A', 'B', 'C'], 'F', ['D', 'E'], 1, 'kyo', 'yugi111'];
var len = array.length;
var results = [];
var indexs = {};
function specialSort(start) {
    start++;
    if (start > len - 1) {
        return;
    }
    if (!indexs[start]) {
        indexs[start] = 0;
    }
    if (!(array[start] instanceof Array)) {
        array[start] = [array[start]];
    }
    for (indexs[start] = 0; indexs[start] < array[start].length; indexs[start]++) {
        specialSort(start);
        if (start == len - 1) {
            var temp = [];
            for (var i = len - 1; i >= 0; i--) {
                if (!(array[start - i] instanceof Array)) {
                    array[start - i] = [array[start - i]];
                }
                temp.push(array[start - i][indexs[start - i]]);
            }
            results.push(temp);
        }
    }
}
 
specialSort(-1);
console.log(results);
```
[地址](https://zhidao.baidu.com/question/390484183256562165.html)
