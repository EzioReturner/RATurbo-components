import React from 'react';
import Layout from '../BasicLayout';
import './index.less';
import '../style';

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
      <div>
        <button type="button" style={buttonStyle} onClick={() => setMode('vertical')}>
          vertical
        </button>
        <button type="button" onClick={() => setMode('horizontal')}>
          horizontal
        </button>
        {mode === 'vertical' && (
          <div>
            <button type="button" style={buttonStyle} onClick={() => setType('split')}>
              split
            </button>
            <button type="button" style={buttonStyle} onClick={() => setType('inline')}>
              inline
            </button>
          </div>
        )}
        {mode !== 'vertical' && (
          <div>
            <button type="button" style={buttonStyle} onClick={() => setFlowMode(true)}>
              flowMode
            </button>
            <button type="button" onClick={() => setFlowMode(false)}>
              unFlowMode
            </button>
          </div>
        )}
      </div>
      <Layout
        mode={mode}
        collapsed={collapsed}
        isContentFlowMode={flowMode}
        verticalType={type}
        onChangeCollapsed={_col => setCollapsed(_col)}
        header={<div className="center-style">header</div>}
        sider={<div className="center-style">sider</div>}
      >
        <div className="layout-body">body</div>
      </Layout>
    </div>
  );
};
