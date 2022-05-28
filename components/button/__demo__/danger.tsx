import React from 'react';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container">
    <Button danger>Default</Button>
    <Button type="primary" danger>
      Primary
    </Button>
    <Button type="dashed" danger>
      Dashed
    </Button>
    <Button type="text" danger>
      Text
    </Button>
    <Button type="link" href="#" danger>
      Link
    </Button>
  </div>
);
