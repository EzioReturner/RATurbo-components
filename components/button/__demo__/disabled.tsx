import React from 'react';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container">
    <Button disabled>Default</Button>
    <Button type="primary" disabled>
      Primary
    </Button>
    <Button type="dashed" disabled>
      Dashed
    </Button>
    <Button type="text" disabled>
      Text
    </Button>
  </div>
);
