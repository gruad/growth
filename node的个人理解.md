[Node入门](https://www.nodebeginner.org/index-zh-cn.html)

[Understanding Node-js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)

1. 非阻塞I/O，事件轮询（event loop）单线程JavaScript，子线程并发，一次只能一个汇报，进入队列汇报。
> That's right, everything runs in parallel, except your code. To understand that, imagine your code is the king, and node is his army of servants.

> The day starts by one servant waking up the king and asking him if he needs anything. The king gives the servant a list of tasks and goes back to sleep a little longer. The servant now distributes those tasks among his colleagues and they get to work.

> Once a servant finishes a task, he lines up outside the kings quarter to report. The king lets one servant in at a time, and listens to things he reports. Sometimes the king will give the servant more tasks on the way out.

> Life is good, for the king's servants carry out all of his tasks in parallel, but only report with one result at a time, so the king can focus. 
