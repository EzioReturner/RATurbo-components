import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

const colData = { name: 'total', age: 18 + 20 + 250 + 2077, address: '-' };

export default () => (
  <Table
    colSummaryData={colData}
    rowSummaryCol={[
      {
        title: 'score',
        id: 'score',
        dataKey: 'score',
        width: '120px',
      },
      {
        title: 'parent',
        id: 'parent',
        dataKey: 'parent',
        width: '120px',
      },
    ]}
    dataSource={[
      { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park', score: 100 },
      { name: 'mary', age: 20, address: 'London No. 1 Lake Park', score: 10 },
      { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park', parent: 'lucy' },
      { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
    ]}
    columns={[
      { title: 'name', dataKey: 'name', id: '1', sorter: (a, b) => a.name.localeCompare(b.name) },
      {
        title: 'age',
        dataKey: 'age',
        defaultSortOrder: 'desc',
        id: '2',
        sorter: (a, b) => a.age - b.age,
      },
      { title: 'address', dataKey: 'address', id: '3' },
    ]}
  />
);
