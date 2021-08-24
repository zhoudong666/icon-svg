# icon-svg

## Project setup

```
yarn install
```

Compiles and hot-reloads for development

```
yarn serve
```

Compiles and minifies for production

```
yarn build
```

Lints and fixes files

```
yarn lint
```

See [Configuration Reference](https://cli.vuejs.org/config/).









# [icon-优雅的使用 icon](https://juejin.cn/post/6844903517564436493)

## 演进史

### **image sprite** 雪碧图

- 将多个图片合成一个图片，然后利用 css 的 background-position 定位显示不同的 icon 图标

### **font 库**

### **iconfont** 一个阿里爸爸做的开源图库

##### unicode 使用

优势:

- 兼容性最好，支持 ie6+

- 支持按字体的方式去动态调整图标大小，颜色等等

**劣势**

- 不支持多色图标
- 在不同的设备浏览器字体的渲染会略有差别

##### font-class

优势

- 兼容性良好，支持 ie8+
- 相比于 unicode 语意明确，书写更直观
- 主要原理其实是和 `unicode` 一样的，它只是多做了一步，将原先`&#xe604`这种写法换成了`.icon-QQ`，它在每个 class 的 before 属性中写了`unicode`,省去了人为写的麻烦。

##### symbol

随着万恶的某某浏览器逐渐淡出历史舞台，svg-icon 使用形式慢慢成为主流和推荐的方法。相关文章可以参考张鑫旭大大的文章[未来必热：SVG Sprite 技术介绍](https://link.juejin.cn/?target=http%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2014%2F07%2Fintroduce-svg-sprite-technology%2F%3Fspm%3Da313x.7781069.1998910419.50)

优势

- 支持多色图标了，不再受单色限制。

- 支持像字体那样通过 font-size,color 来调整样式。

- 支持 ie9+

- 可利用 CSS 实现动画。

- 减少 HTTP 请求。

- 矢量，缩放不失真

- 可以很精细的控制 SVG 图标的每一部分

1. **使用方法：** 第一步：拷贝项目下面生成的 symbol 代码：

   ```
   引入  ./iconfont.js
   复制代码
   ```

   第二步：加入通用 css 代码（引入一次就行）：

   ```
   <style type="text/css">
       .icon {
          width: 1em; height: 1em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
       }
   </style>
   复制代码
   ```

   第三步：挑选相应图标并获取类名，应用于页面：

   ```
   <svg class="icon" aria-hidden="true">
       <use xlink:href="#icon-xxx"></use>
   </svg>
   ```

   使用 svg-icon 的好处是我再也不用发送`woff|eot|ttf|` 这些很多个字体库请求了，我所有的 svg 都可以内联在 html 内。

   PS：这里其实还用到了 `SVG Sprite` 技术。简单的理解就是类 svg 的似雪碧图，它在一个 svg 之中运用 symbol 标示了一个一个的 svg 图标，这样一个页面中我们遇到同样的 svg 就不用重复再画一个了，直接使用`<use xlink:href="#icon-QQ" x="50" y="50" />` 就能使用了，具体的细节可以看这篇文章开头的文章 [未来必热：SVG Sprite 技术介绍](https://link.juejin.cn?target=http%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2014%2F07%2Fintroduce-svg-sprite-technology%2F)

## 进一步改造

### 使用 svg-sprite

要使用到 [svg-sprite-loader](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkisenka%2Fsvg-sprite-loader) 这个神器了， 它是一个 webpack loader ，可以将多个 svg 打包成 `svg-sprite` 。

我们来介绍如何在 `vue-cli` 的基础上进行改造，加入 `svg-sprite-loader`。

我们发现`vue-cli`默认情况下会使用 `url-loader` 对 svg 进行处理，会将它放在`/img` 目录下，所以这时候我们引入`svg-sprite-loader` 会引发一些冲突。

```
//默认`vue-cli` 对svg做的处理，正则匹配后缀名为.svg的文件，匹配成功之后使用 url-loader 进行处理。
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}
复制代码
```

解决方案有两种，最简单的就是你可以将 test 的 svg 去掉，这样就不会对 svg 做处理了，当然这样做是很不友善的。

- 你不能保证你所有的 svg 都是用来当做 icon 的，有些真的可能只是用来当做图片资源的。
- 不能确保你使用的一些第三方类库会使用到 svg。

所以最安全合理的做法是使用 webpack 的 [exclude](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fmodule%2F%23rule-exclude) 和 [include](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fmodule%2F%23rule-include) ，让`svg-sprite-loader`只处理你指定文件夹下面的 svg，`url-loaer`只处理除此文件夹之外的所以 svg，这样就完美解决了之前冲突的问题。 代码如下

```js
{
  test: /\.svg$/,
  loader: "svg-sprite-loader",
  include: [resolve("src/icons")],
  options: {
    symbolId: "icon-[name]",
  },
},
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: "url-loader",
  exclude: [resolve("src/icons")],
  options: {
    limit: 10000,
  },
},
```

这样配置好了，只要引入 svg 之后填写类名就可以了

```
import '@/src/icons/qq.svg; //引入图标

<svg><use xlink:href="#qq" /></svg>  //使用图标
```

单这样还是非常的不优雅，如果我项目中有一百个 icon，难不成我要手动一个个引入么！ **偷懒是程序员的第一生产力！！！**

### 自动导入

首先我们创建一个专门放置图标 icon 的文件夹如：`@/src/icons`，将所有 icon 放在这个文件夹下。 之后我们就要使用到 webpack 的 [require.context](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fdependency-management%2F%23require-context)。很多人对于 `require.context`可能比较陌生，直白的解释就是

> require.context("./test", false, /.test.js$/); 这行代码就会去 test 文件夹（不包含子目录）下面的找所有文件名以 `.test.js` 结尾的文件能被 require 的文件。 更直白的说就是 我们可以通过正则匹配引入相应的文件模块。

require.context 有三个参数：

- directory：说明需要检索的目录
- useSubdirectories：是否检索子目录
- regExp: 匹配文件的正则表达式

了解这些之后，我们就可以这样写来自动引入 `@/src/icons` 下面所有的图标了

```
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
复制代码
```

之后我们增删改图标直接直接文件夹下对应的图标就好了，什么都不用管，就会自动生成 `svg symbol`了。

## 更进一步优化自己的 svg

虽然 iconfont 网站导出的 svg 内容已经算蛮精简的了，但你会发现其实还是与很多无用的信息，造成了不必要的冗余。就连 iconfont 网站导出的 svg 都这样，更不用说那些更在意 ui 漂不漂亮不懂技术的设计师了(可能)导出的 svg 了。好在 `svg-sprite-loader`也考虑到了这点，它目前只会获取 svg 中 path 的内容，而其它的信息一概不会获取。生成 svg 如下图：

```
<svg t="1629786326610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3009"
  width="128" height="128">
  <path
    d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
    p-id="3010">
  </path>
</svg>
```

但任何你在 path 中产生的冗余信息它就不会做处理了。如注释什么的

```
<svg class="icon" viewBox="0 0 1024 1024" fill="currentColor"><path d="M853.333 480H544V170.667c0-17.067-14.933-32-32-32s-32 14.933-32 32V480H170.667c-17.067 0-32 14.933-32 32s14.933 32 32 32H480v309.333c0 17.067 14.933 32 32 32s32-14.933 32-32V544h309.333c17.067 0 32-14.933 32-32s-14.933-32-32-32z"/></svg>
```

使用另一个很好用的东西了-- [svgo](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsvg%2Fsvgo)







# svg-sprite-loader 使用教程

> 本篇文章是在 vue-cli 脚手架项目环境下讲解

svg-sprite-loader 将加载的 svg 图片拼接成 雪碧图，放到页面中，其它地方通过 <use> 复用

###### 首先在 src 下建立以下目录和文件：

```
src
  |--icons
  	|--svg
  	  |--eye.svg
  |--index.js
  
```

##### 安装和配置 svg-sprite-loader:

安装：

```javascript
npm i -D svg-sprite-loader
```

webpack 配置：

```vue
  {
      test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        },
        exclude: [resolve('src/icons')]
      },
```

> 注意 url-loader 中要将 icons 文件夹排除, 不让 url-loader 处理该文件夹

##### components 中新建组件 SvgIcon.vue:

```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

##### icons 下面的 index.js 写入以下内容：

```vue
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
```

##### 入口 main.js 将 index.js 引入：

```javascript
import '@/icons'
```

##### 然后 就可以使用了：

前面已经全局注册了，所以可以直接使用

```vue
<svg-icon icon-class="eye"></svg-icon>
```

- icon-class 的值是 svg 文件名