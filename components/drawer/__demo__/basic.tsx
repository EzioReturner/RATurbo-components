import React from 'react';
import Drawer from '../index';
import '../style';

export default () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
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
