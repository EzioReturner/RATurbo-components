/* eslint-disable  import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop';
import path from 'path';

const validateFn = (value: any) => {
  if (!value) {
    return '必填项';
  } 
  return true;
}

export default function(plop: NodePlopAPI) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      { type: 'input', name: 'name', message: '请输入组件名称（多个单词使用短横线隔开式命名）', validate: validateFn},
      { type: 'input', name: 'CN', message: '请输入组件中文名称', validate: validateFn },
      { type: 'input', name: 'description', message: '请输入组件描述' },
      { type: 'input', name: 'contributors', message: '请输入贡献者名称' },
      { type: 'list', name: 'compType', message: '请选择组件所属菜单类别：功能[components]、布局[layout]', choices: ['components', 'layout'] }
    ],
    actions: [
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/index.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/{{pascalCase name}}.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/comp.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/style/index.less'),
        templateFile: path.resolve(__dirname, '../templates/component/style/style.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/style/index.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/style/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../site/{{kebabCase name}}/index.mdx'),
        templateFile: path.resolve(__dirname, '../templates/component/doc.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/interface.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/interface.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/__demo__/basic.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/__demo__/basic.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../components/{{kebabCase name}}/__tests__/index.test.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/__tests__/index.test.hbs'),
      }
    ],
  });
}
