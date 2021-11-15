import React from 'react';
import RouterRender from '../index';

const Main: React.FC = ({ children }) => {
  console.log(children);
  return (
    <section
      style={{
        height: '200px',
        width: '400px',
        background: 'black',
      }}
    >
      <span style={{ color: 'white' }}>main</span>
      <div
        style={{
          height: '100px',
          width: '300px',
          background: 'pink',
        }}
      >
        {children}
      </div>
    </section>
  );
};

const Child: React.FC = () => <div>child</div>;

const config = [
  {
    path: '/main',
    component: Main,
    age: 18,
    routes: [
      {
        path: '/main/child',
        component: Child,
      },
    ],
  },
];

export default () => (
  <>
    <div>请访问 /#/main/child 路由</div>
    <RouterRender routeConfig={config} />
  </>
);
