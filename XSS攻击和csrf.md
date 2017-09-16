### XSS（Cross Site Scripting）:跨站脚本攻击
为了和（Cascading Style Sheet）的缩写CSS区别，故将跨站脚本攻击缩写为XSS。
恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

[如何防御XSS](http://hyuhan.com/2016/09/09/client-script-security/)

### CSRF(Cross site request Forgrey):跨站请求伪造。也被称为“One Click Attack”或者Session Riding。常缩写成CSRF或XSRF.

是一种对网站的恶意利用。尽管听起来像跨站脚本（XSS），但它与XSS非常不同，XSS利用站点内的信任用户，
而CSRF则通过伪装来自受信任用户的请求来利用受信任的网站。与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，
所以被认为比XSS更具危险性。

[如何防御CSRF](http://blog.csdn.net/stpeace/article/details/53512283)
