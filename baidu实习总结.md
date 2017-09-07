### 1. 前端自动化——UI自动化测试框架
—— macaca selenium phantom appium

**选择selenium的原因**

1. 专注于PC端。

2. 支持Java js等基本语言，且免费版本够用。

3. 周边工具更加全面，配合可持续集成工具Jenkins，以帮助我们进行用例的管理以及任务的调度。

4. 对于UI自动化，只有当他成为一种规范化的程式定期的触发与执行，这样才能发挥他的作用，因此，一个持续集成系统对于自动化的长期发展是必不可少的，而Jenkins提供这套系统，这意味着我们无需搭建自己的一套持续集成环境。

5. 配合webdriver（支持Java）元素查找工具，极大的方便了控件的查找以及定位。

6. 配合extendreport，可以美化我们的测试报告。

### 2. Jenkins
>Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。

### 3.总结

1. 有浏览器的用selenium做测试框架，chromedriver做驱动。

2. 服务器端linux系统无浏览器用phantom.js做测试框架。

3. extendreport用于美化生成的测试报告。

### 查看selenium生成报告无非以下几种：

1. Eclipse+Junit 这种最简单但是局限在于只能在Eclipse里看，这个就是用最原生的Junit单元测试框架。

2. Junit+Ant 用Ant来驱动Selenium执行，会生成一个xml，通过xsl样式表来形成一个html的报告，报告比较全面，但是样式和内容的自定义能力比较差。

3. Testng的报告，也是Html的格式。

4. 自定义的report，基本上用assert或者log来结合做一个report，直接写html标签来实现，这样的格式自定义比较强，但是需要编码功底，至于样式就看个人能力了。

5. 这里我推荐一个jar包 Extentreport  基于这个jar包来生成的html不仅美观而且可读取强，如果不满意里面的排列和内容还可以自定义，是个生成html report的利器。
