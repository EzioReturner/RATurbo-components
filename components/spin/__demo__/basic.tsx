import React from 'react';
import Spin from '../index';
import '../style';

const styles: React.CSSProperties = {
  height: '300px',
  position: 'relative',
  border: '1px dashed #a2a2a2',
};

export default () => (
  <div style={styles}>
    <Spin spinning />
  </div>
);
