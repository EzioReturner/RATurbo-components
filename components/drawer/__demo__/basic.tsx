import React from 'react';
import Drawer from '../index';
import '../style';
import Button from 'raturbo-components/lib/button';
import 'raturbo-components/lib/button/style';

export default () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        open
      </Button>
      <Drawer direction="right" open={open} openChange={_open => setOpen(_open)}>
        <div
          style={{
            height: '100vh',
            width: '500px',
            background: '#ffffff',
          }}
        >
          23333
        </div>
      </Drawer>
    </div>
  );
};
