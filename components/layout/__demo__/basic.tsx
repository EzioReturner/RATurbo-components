import React from 'react';
import Layout from '../BasicLayout';
import './index.less';
import '../style';
import Button from 'raturbo-components/lib/button';
import 'raturbo-components/lib/button/style';

const buttonStyle = {
  marginRight: '12px',
  marginBottom: '12px',
};

export default () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const [type, setType] = React.useState<any>('split');

  const [mode, setMode] = React.useState<any>('vertical');

  const [flowMode, setFlowMode] = React.useState<boolean>(false);

  return (
    <div className="layout-demo-container">
      <div style={{ display: 'flex' }}>
        <div style={buttonStyle}>
          <Button
            type={mode === 'vertical' ? 'primary' : 'default'}
            onClick={() => setMode('vertical')}
          >
            vertical
          </Button>
        </div>
        <div style={buttonStyle}>
          <Button
            type={mode === 'horizontal' ? 'primary' : 'default'}
            onClick={() => setMode('horizontal')}
          >
            horizontal
          </Button>
        </div>
        {mode === 'vertical' && (
          <>
            <div style={buttonStyle}>
              <Button
                type={type === 'split' ? 'primary' : 'default'}
                onClick={() => setType('split')}
              >
                split
              </Button>
            </div>
            <div>
              <Button
                type={type === 'inline' ? 'primary' : 'default'}
                onClick={() => setType('inline')}
              >
                inline
              </Button>
            </div>
          </>
        )}
        {mode !== 'vertical' && (
          <>
            <div style={buttonStyle}>
              <Button type={flowMode ? 'primary' : 'default'} onClick={() => setFlowMode(true)}>
                flowMode
              </Button>
            </div>
            <Button type={!flowMode ? 'primary' : 'default'} onClick={() => setFlowMode(false)}>
              unFlowMode
            </Button>
          </>
        )}
      </div>
      <Layout
        mode={mode}
        collapsed={collapsed}
        contentFlowMode={flowMode}
        verticalType={type}
        onChangeCollapsed={_col => setCollapsed(_col)}
        header={<div className="center-style">header</div>}
        sider={<div className="center-style">sider</div>}
        collapseIcon={originNode => <div>{originNode}</div>}
      >
        <div className="layout-body">body</div>
      </Layout>
    </div>
  );
};
