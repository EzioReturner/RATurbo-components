import React from 'react';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container" style={{ width: '50%' }}>
    <Button block>Default</Button>
    <Button type="primary" block>
      Primary
    </Button>
    <Button type="dashed" block>
      Dashed
    </Button>
    <Button type="text" block>
      Text
    </Button>
    <Button type="link" href="#" block>
      Link
    </Button>
  </div>
);
