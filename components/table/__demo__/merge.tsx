import React from 'react';
import Table from 'raturbo-components/lib/table';
import Button from 'raturbo-components/lib/button';
import 'raturbo-components/lib/button/style';
import 'raturbo-components/lib/table/style';

export default () => {
  const [active, setActive] = React.useState('normal');

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Button
          type={active === 'normal' ? 'primary' : 'default'}
          onClick={() => setActive('normal')}
        >
          常规
        </Button>
        <div style={{ margin: '0 12px 24px' }}>
          <Button
            type={active === 'verticalCenter' ? 'primary' : 'default'}
            onClick={() => setActive('verticalCenter')}
          >
            合并后居中
          </Button>
        </div>
        <Button
          type={active === 'alignPrevCol' ? 'primary' : 'default'}
          onClick={() => setActive('alignPrevCol')}
        >
          合并对齐前一列
        </Button>
        <div style={{ marginLeft: '12px' }}></div>
        <Button
          type={active === 'centerAlignPrevCol' ? 'primary' : 'default'}
          onClick={() => setActive('centerAlignPrevCol')}
        >
          居中同时对齐前一列
        </Button>
      </div>
      <Table
        dataSource={[
          { name: 'marry', secName: 'cookie', age: 18, address: 'New York No. 1 Lake Park' },
          { name: 'marry', secName: 'cookie', age: 20, address: 'London No. 1 Lake Park' },
          { name: 'marry', secName: 'cookie', age: 21, address: 'London No. 1 Lake Park' },
          { name: 'marry1', secName: 'cookie', age: 22, address: 'London No. 1 Lake Park' },
          { name: 'marry2', secName: 'cookie', age: 23, address: 'London No. 1 Lake Park' },
          { name: 'jim', secName: 'token', age: 250, address: 'Sidney No. 1 Lake Park' },
          { name: 'pink', secName: 'session', age: 20, address: 'Sidney No. 1 Lake Park' },
          { name: 'green', secName: 'session', age: 2077, address: 'London No. 2 Lake Park' },
          { name: 'green', secName: 'session', age: 2077, address: 'London No. 2 Lake Park' },
          { name: 'green', secName: 'auth', age: 2077, address: 'London No. 2 Lake Park' },
          { name: 'amy', secName: 'union', age: 2077, address: 'London No. 2 Lake Park' },
        ]}
        columns={[
          {
            title: 'name',
            mergeRow: true,
            mergeVerticalCenter: !!['verticalCenter', 'centerAlignPrevCol'].includes(active),
            dataKey: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: 'secName',
            mergeRow: true,
            mergeVerticalCenter: !!['verticalCenter', 'centerAlignPrevCol'].includes(active),
            mergeAlignPrevCol: !!['alignPrevCol', 'centerAlignPrevCol'].includes(active),
            dataKey: 'secName',
            sorter: (a, b) => a.secName.localeCompare(b.secName),
          },
          {
            title: 'age',
            dataKey: 'age',
            sorter: (a, b) => a.age - b.age,
          },
          { title: 'address', dataKey: 'address', id: '3' },
        ]}
      />
    </div>
  );
};
