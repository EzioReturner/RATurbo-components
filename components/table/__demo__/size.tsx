import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

export default () => {
  const [size, setSize] = React.useState<'mini' | 'middle' | 'large'>('mini');

  const style = { marginBottom: '24px' };

  return (
    <section>
      <div style={style}>
        <button type="button" onClick={() => setSize('mini')}>
          mini
        </button>
        <button type="button" style={{ margin: '0 24px' }} onClick={() => setSize('middle')}>
          middle
        </button>
        <button type="button" onClick={() => setSize('large')}>
          large
        </button>
      </div>
      <Table
        size={size}
        dataSource={[
          { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
          { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
          { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
          { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
        ]}
        columns={[
          { title: 'name', dataKey: 'name', id: '1' },
          { title: 'age', dataKey: 'age', id: '2' },
          { title: 'address', dataKey: 'address', id: '3' },
        ]}
      />
    </section>
  );
};
