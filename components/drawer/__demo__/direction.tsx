import React from 'react';
import Drawer from '../index';
import '../style';

type D = 'right' | 'up' | 'left' | 'down';

export default () => {
  const [open, setOpen] = React.useState(false);

  const [direct, setDir] = React.useState<D>('right');

  const _style = {
    display: 'flex',
  };

  const buttonStyle = {
    marginLeft: '18px',
  };

  return (
    <div>
      <div style={_style}>
        {['up', 'down', 'right', 'left'].map(_d => (
          <div key={_d}>
            <input
              onChange={() => setDir(_d as D)}
              checked={_d === direct}
              type="radio"
              value={_d}
              name="dir"
            />
            <span>{_d}</span>
          </div>
        ))}
        <button style={buttonStyle} type="button" onClick={() => setOpen(true)}>
          open
        </button>
      </div>

      <Drawer direction={direct} open={open} openChange={_open => setOpen(_open)}>
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
