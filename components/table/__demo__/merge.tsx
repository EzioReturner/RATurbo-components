import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

export default () => (
  <Table
    dataSource={[
      { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
      { name: 'ezio', age: 20, address: 'London No. 1 Lake Park' },
      { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
      { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
    ]}
    columns={[
      {
        title: 'name',
        mergeRow: true,
        dataKey: 'name',
        id: '1',
        defaultSortOrder: 'asc',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'age',
        dataKey: 'age',
        id: '2',
        sorter: (a, b) => a.age - b.age,
      },
      { title: 'address', dataKey: 'address', id: '3' },
    ]}
  />
);
