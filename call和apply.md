fuck，一直记不住这两个函数的使用

call:

　　语法：call([thisObj[,arg1[, arg2[, [,.argN]]]]])

　　参数 thisObj 可选项。将被用作当前对象的对象。 arg1, arg2, , argN 可选项。将被传递方法参数序列。
  
apply:

    语法：apply([thisObj[,argArray]]) 
    
　　定义：应用某一对象的一个方法，用另一个对象替换当前对象。 
  
  　说明： 
   
　　如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 
  
　　如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。
