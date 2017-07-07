### 总体思路
1. express是nodejs的一个web框架，负责后台的。
2. mongoose是mongodb的一个object model操作对象模型，负责操作数据库。
3. bootstrap负责前端的页面布局。
4. 页面渲染引擎是ejs模板。

### 实现功能
1. 地址输入：localhost:27017,进入主页，有注册和登录按钮。
2. 点击登录，进入登录（/login）页面，如果数据库中存在，这登录成功，跳转到（/home）页面。
3. 点击注册，进入注册（/register）页面，写入数据库，注册成功，这跳转到（/login）页面。
4. （/home）页面点击注销按钮，清除数据库中的数据，注销成功，则跳转到初始页面（http://localhost:27017/）。
