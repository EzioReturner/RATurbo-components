import React from 'react';
import Button from 'turbo-components/lib/button';

import '../style';

export default () => (
  <div className="button-demo-container">
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="link" href="#">
      Link
    </Button>
  </div>
);
