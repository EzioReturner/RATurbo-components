import React from 'react';
import Pagination from 'raturbo-components/lib/pagination';
import 'raturbo-components/lib/pagination/style';

const style = { width: '300px' };

export default () => (
  <div style={style}>
    <Pagination total={100} pageSize={10} />
  </div>
);
