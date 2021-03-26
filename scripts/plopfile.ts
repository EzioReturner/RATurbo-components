/* eslint-disable  import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop';
import path from 'path';

export default function(plop: NodePlopAPI) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      { type: 'input', name: 'name', message: '请输入组件名称（多个单词使用驼峰命名）' },
      { type: 'input', name: 'CN', message: '请输入组件中文名称' },
      { type: 'input', name: 'description', message: '请输入组件描述' },
    ],
    actions: [
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/index.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/{{pascalCase name}}.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/comp.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/style/index.less'),
        templateFile: path.resolve(__dirname, '../templates/component/style/style.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/style/index.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/style/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../site/{{pascalCase name}}/index.mdx'),
        templateFile: path.resolve(__dirname, '../templates/component/doc.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/interface.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/interface.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/__demo__/basic.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/__demo__/basic.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{pascalCase name}}/__tests__/index.test.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/__tests__/index.test.hbs'),
      },
      {
        type: 'append',
        path: path.resolve(__dirname, '../components/index.ts'),
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: "export { default as {{pascalCase name}} } from './{{pascalCase name}}';",
      },
    ],
  });
}
