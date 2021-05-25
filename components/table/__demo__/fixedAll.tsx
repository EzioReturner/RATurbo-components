import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

const style = { height: '200px' };

export default () => (
  <section style={style}>
    <Table
      fixedHeader
      fixedSize={1}
      dataSource={[
        { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
        { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
        { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
        { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
        { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
        { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
        { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
        { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
      ]}
      columns={[
        {
          title: 'name',
          width: '150px',
          dataKey: 'name',
          id: '1',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'age',
          dataKey: 'age',
          defaultSortOrder: 'desc',
          id: '2',
          width: '200px',
          sorter: (a, b) => a.age - b.age,
        },
        { title: 'address', dataKey: 'address', id: '3', width: '300px' },
        { title: 'address', dataKey: 'address', id: '4', width: '300px' },
        { title: 'address', dataKey: 'address', id: '5' },
        { title: 'address', dataKey: 'address', id: '6' },
      ]}
    />
  </section>
);
