# Beauty-webpack
## Motive
快速搭建前端项目，减少webpack配置学习成本
## Install
```bash
npm install beauty-webpack --save-dev
```
## Usage
### 命令
```json
//package.json
{
  "script": {
      //开发
      "start": "beauty start",
      //打包
      "build": "beauty build",
      //分析
      "analyze": "beauty analyze"
  }
}
```

### Spa项目
#### 目录结构
```
.
+-- src
|   +-- ...
|   +-- index.(js|jsx)
```
#### 入口文件
```jsx harmony
//src/index.js
import React from 'react'
import ReactDOM from 'react-dom'

const Home=()=><div>Home</div>

ReactDOM.render(<Home/>, document.querySelector('#root'))
```
### Mpa项目
#### 目录结构
```
.
+-- src
|   +-- ...
|   +-- activity
|       +-- index.(js|jsx)
|   +-- home
|       +-- index.(js|jsx)

```
#### 入口文件
```jsx harmony
//src/index.js
import React from 'react'
import ReactDOM from 'react-dom'

const Home=()=><div>Home</div>

ReactDOM.render(<Home/>, document.querySelector('#root'))
```
### 配置文件
允许自定义添加配置文件修改webpack配置
需要在根目录添加.beautyrc.js文件

属性|说明|备注
---|---|---
entry|入口配置(只限Spa项目)|参考webpack entry
output|输出配置| 参考webpack output
publicPath|文件输出目录|参考webpack publicPath
isExtractCss|是否提取公共样式|
alias|别名|默认@为src文件夹
splitChunks|分包策略|参数webpack splitChunks
chunks|js分包模块|配合entry 
define|定义项目全局变量| {"process.NODE.env":{...}}

### 模版文件
默认有模板文件，需要自定义可以在src目录下添加document.ejs 配置参数参考[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"/>
    <script src="//web-cdn.meilly.cn/stash/flexible.js"></script>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="icon" href="/favicon.png" type="image/x-icon"/>
</head>
<body>
<noscript>Sorry, we need js to run correctly!</noscript>
<div id="root">
</div>
<% htmlWebpackPlugin.files.js.forEach(function(js) { %>
    <script src="<%= js %>"></script>
<% }) %>
<% if(webpackConfig.mode === 'production') { %>
    <script defer
            src="https://jic.talkingdata.com/app/h5/v1?appid=2F65664B662A4C80A0F941774CFD28FB&vn=mellyv1.0&vc=2.7.1"></script>
<% } %>
</body>
</html>
```

