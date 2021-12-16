import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

export default () => (
  <Table
    dataSource={[
      { name: 'marry', secName: 'marry', age: 18, address: 'New York No. 1 Lake Park' },
      { name: 'marry', secName: 'marry', age: 20, address: 'London No. 1 Lake Park' },
      { name: 'marry', secName: 'marry2', age: 21, address: 'London No. 1 Lake Park' },
      { name: 'marry', secName: 'marry3', age: 22, address: 'London No. 1 Lake Park' },
      { name: 'marry', secName: 'marry4', age: 23, address: 'London No. 1 Lake Park' },
      { name: 'jim', secName: 'marry5', age: 250, address: 'Sidney No. 1 Lake Park' },
      { name: 'pink', secName: 'marry6', age: 20, address: 'Sidney No. 1 Lake Park' },
      { name: 'green', secName: 'marry7', age: 2077, address: 'London No. 2 Lake Park' },
      { name: 'green', secName: 'marry8', age: 2077, address: 'London No. 2 Lake Park' },
      { name: 'green', secName: 'marry9', age: 2077, address: 'London No. 2 Lake Park' },
    ]}
    columns={[
      {
        title: 'name',
        mergeRow: true,
        dataKey: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'secName',
        mergeRow: true,
        dataKey: 'secName',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'age',
        dataKey: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      { title: 'address', dataKey: 'address', id: '3' },
    ]}
  />
);
