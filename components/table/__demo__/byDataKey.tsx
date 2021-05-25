import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

export default () => (
  <Table
    dataSource={[
      { name: 'ezio', age: 18 },
      { name: 'mary', age: 20 },
    ]}
    columns={[
      { title: 'name', dataKey: 'name', id: '1' },
      { title: 'age', dataKey: 'age', id: '2' },
    ]}
  />
);
