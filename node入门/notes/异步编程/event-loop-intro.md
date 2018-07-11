# 异步编程概述

## 事件模型

`setTimeout`和`setInterval`的运行机制, 是将里面的回调函数, 在本轮事件循环的多有同步任务都执行完以后才执行, 一般如下:

```js
setTimeout(taskA, 0) // B 执行完成以后再执行
taskB() //  同步任务, 先执行
```




```js
for (var i = 1; i < 3; i++) {
    setTimeout(() => {
        console.log(i)
    }, 0)
}
// 4 4 4
```