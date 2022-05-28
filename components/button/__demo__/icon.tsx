import React from 'react';
import RefreshCw from 'react-feather/dist/icons/refresh-cw';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container">
    <Button icon={<RefreshCw style={{ width: '16px', height: '16px' }} />} />
    <Button
      icon={<RefreshCw style={{ width: '16px', height: '16px' }} />}
      type="primary"
      shape="circle"
    />
    <Button type="primary" shape="circle">
      A
    </Button>
    <Button shape="circle" type="dashed">
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </Button>

    <Button icon={<RefreshCw style={{ width: '16px', height: '16px' }} />}>
      <span>刷新</span>
    </Button>

    <br />

    <Button size="large">
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </Button>
    <Button size="large" type="primary" shape="circle">
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </Button>
    <Button size="large" type="primary" shape="circle">
      A
    </Button>
    <Button size="large" shape="circle" type="dashed">
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </Button>

    <Button size="large" icon={<RefreshCw style={{ width: '16px', height: '16px' }} />}>
      <span>刷新</span>
    </Button>
  </div>
);
