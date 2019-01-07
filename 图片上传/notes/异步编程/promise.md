# Promise 简介

## 写法

`promise` 与回调函数的写法
```js
f1(f2) // f1 为异步操作代码, f2 为回调函数

const f1 = function(resolve, reject) {
    // 异步代码
}

var p1 = new Promise(f1)
p1.then(f2)
```

思想为: 所有异步任务都返回一个`Promise`实例, 该实例有一个`then`方法, 用来指定下一步的回调函数