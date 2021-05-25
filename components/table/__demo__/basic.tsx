import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

export default () => (
  <Table
    dataSource={[
      ['ezio', 18],
      ['mary', 20],
    ]}
    columns={[
      { title: 'name', dataIndex: 0, id: '1' },
      { title: 'age', dataIndex: 1, id: '2' },
    ]}
  />
);
