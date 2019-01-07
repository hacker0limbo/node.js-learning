# node.js 概述

## 模块化
每一个文件就是一个模块, 可以使用`module.exports`进行导出, 导出的是一个对象, 写法如下:

```js
// m1.js
const x = 5
const add = (x, y) => {
    return x + y
}
module.exports = {
    x: x,
    add: add
}

// index.js
const m1 = require('m1')
console.log(m1.x, m1.add(1, 2)) // 5, 3
```
