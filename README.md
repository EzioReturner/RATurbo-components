[<img alt="Turbo-admin" height="64" src="http://docs.raturbo.com/media/favicon.ico" />](https://github.com/EzioReturner/RATurbo-components)

<h1 align="center">Turbo-components</h1>

## 目录结构

The project layout is as follows:

```bash
├── components              // 组件文件夹
│   ├── _utils              // 方法库
│   └── index.ts            // 入口文件
├── e2e                     // e2e test directory
├── node_modules            // Black hole
├── site                    // 文档目录
├── scripts                 // 项目脚本
├── src                     // Source code
│    ├── docs-comps         // docz 组件
│    └── utils              // 方法库
├── .babelrc.js             
├── .browserslistrc.js  
├── .eslintrc.js             
├── .gitignore             
├── .prettierignore        
├── .doczrc.js                
├── gatsby-config.js
├── gatsby-node.js
├── gulpfile.js 
├── package.json          
├── README.md             
├── tsconfig.build.json
├── tsconfig.json
└── yarn-lock              
```

## 快速上脚

### 按需加载
```javascript
import { Alert } from 'turbo-components';
import 'turbo-components/lib/alert/style';
```

### 使用babel-plugin-component

安装[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)

```bash
yarn add babel-plugin-component --dev
```

修改.babelrc.js
```javascript
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "turbo-components",
        "style": true // or 'css'
      }
    ]
  ]
}
```

## 开发者指南

### 技术栈

- Node.js 12+
- NPM 3+
- [react 16+](https://facebook.github.io/react/)
- [docz](https://www.docz.site/)
- [less](http://lesscss.cn/)(<span style="color: rgb(243,121,52);">css preprocess</span>)
- [babel](https://babeljs.io/)
- [gulp](https://www.gulpjs.com.cn/)
- [webpack](https://webpack.docschina.org/)

### 开发规范

- 代码请通过ESLint校验
- 组件样式请加tc命名空间前缀并使用括折号-命名，例：tc-button。（默认初始化新组件已做这层处理，相关样式请写在根classname内部）
- js属性命名遵循驼峰命名法

### 组件开发流程
从 release 分支中切出 feature-date-yourComponentName-yourName 如 feature-2077.02.31-helloWorld-zhewei.wang

执行脚本
```bash
# 初始化新组件请运行 `new` 命令，并补充信息
yarn new

...
yarn run v1.13.0
$ plop --plopfile ./scripts/plopfile.ts
? 请输入组件名称（多个单词使用驼峰命名） yourComponentName
? 请输入组件中文名称 
? 请输入组件描述 
...
```

> 该命令会初始化组件对应的目录文件、代码、开发页面；

- 组件路径：components/[componentName]
- 文档路径：site/[componentName]

组件开发请在 components/[componentName] 中进行，__demo__ 文件夹中编写示例。
文档编写位于 site/[componentName]/index.mdx 文件


### 如果你需要使用icon
请参考[react-feather](https://feathericons.com/)

- 在组件中引用

```javascript
import ChevronsRight from 'react-feather/dist/icons/chevron-right';
```

- 在`components/_models`中声明icon
```javascript
...
declare module 'react-feather/dist/icons/chevron-right';
...
```


### 不同路径写法在构建中的区别

- `import xxx from './**'` 相对路径文件在构建lib包时会将其打包进来
- `import xxx from 'turbo-components/lib/**'` 该写法在构建lib时不会打包对应文件，在引用跨组件文件时，推荐该写法

### 组件提交

组件开发完成后请提交Merge Requests给相关人员进行review，通过后会手动将组件添加到包入口文件`components/index.ts`，执行相关命令即可发布成功；

### 构建并发布npm库
```bash
npm run build
npm set registry https://registry.yarnpkg.com
npm run pub
```
## support environment

modern browser.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | 
|IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions
