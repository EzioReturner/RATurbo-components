import React from 'react';
import RefreshCw from 'react-feather/dist/icons/refresh-cw';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container">
    <Button size="large">large</Button>
    <Button>default</Button>
    <Button size="small">small</Button>

    <br />

    <Button size="large" shape="round">
      large
    </Button>
    <Button shape="round">default</Button>
    <Button size="small" shape="round">
      small
    </Button>

    <br />
    <Button size="large" shape="circle">
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </Button>
    <Button shape="circle">
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </Button>
    <Button size="small" shape="circle">
      <RefreshCw style={{ width: '14px', height: '14px' }} />
    </Button>
  </div>
);
