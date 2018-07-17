# 爬取豆瓣电影 top 250

## 分析

分析网页以后发现, 每一个电影条目基本格式是一样的, 因此可以使用类似`jquery`的库获取所有`dom`信息, 每个电影条目的 html 如下:
```pug
div .item 
    div .pic
        em // 排名
        a 
            img (src) // 图片地址
    div .info
        div .hd
            span .title // 电影名
        div .bd
            div .star
                span .rating_num // 评分
            div .quote
                span .inq // 引用
```

## 库使用

### cheerio
适用于服务端处理 html, 与`jquery`语法类似, 可以快速获取服务器内 html 文件里面的 dom 元素

快速用法:

html 如下:
```html
<ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
</ul>
```

```js
var cheerio = require('cheerio');
var e = cheerio.load('<ul>...</ul>');
// e 的选择器和 jquery 以及 querySelectorAll()用法一样, 里面匹配的是 css 选择器
```

常见 api:
```js
e('ul').attr('id') //=> fruits

e('ul').html(); //=> <li class="apple">apple</li>....
e('.orange').html() //=> Orange

$('.orange').text() //=> Orange

$('#fruits').find('li').length //=> 3
```
有一个点要注意, `x.html()`是不包含该 x 元素的, 返回的是里面的所有 html 字符串, 但是如果是`e.html()`, 则返回的根 html 字符串

### request

可以 使用该模块发送最简单的`http`请求, 用法如下:

```js
const request = require('request')
request('http://www.itbilu.com', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body) // body 是请求页面的 所有 html code
    }
})
```

## 整理数据
得到的数据是一个 json 格式, 有一个大数组包含所有信息, 每一个分数组对应一个页面, 里面一共有25个对象对应25个电影信息, 大致如下
```json
[
  [
    {电影1}, {电影2}, {电影3}
  ],
  [
    {电影26}, {电影27}, {电影28}
  ],
  [
    ...
  ]
]
```

需要整理的是, 将所有里面的文件整合为一个数组, 里面仅有电影对象, 所有的页面数组都被拼接起来.

## 注意点

- `fs.writeFile()`每次都会将新内容覆盖原始内容, `fs.appendFile()`是在原始内容的基础上添加新内容
- `array.concat()`返回一个新数组, 原数组不变