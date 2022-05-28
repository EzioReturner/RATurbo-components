import React from 'react';
import RefreshCw from 'react-feather/dist/icons/refresh-cw';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container">
    <div
      className="button-ghost-wrapper"
      style={{ padding: ' 10px', background: 'rgb(190, 200, 200)' }}
    >
      <Button ghost>Default</Button>
      <Button type="primary" ghost>
        Primary
      </Button>
      <Button type="dashed" ghost>
        Dashed
      </Button>
      <Button danger ghost>
        Danger
      </Button>
      <Button type="primary" shape="circle" ghost>
        <RefreshCw style={{ width: '16px', height: '16px' }} />
      </Button>
    </div>
  </div>
);
