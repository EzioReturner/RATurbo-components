import React from 'react';
import Pagination from '../index';
import '../style';

export default () => (
  <div style={{ width: '300px' }}>
    <Pagination total={100} pageSize={10} />
  </div>
);
