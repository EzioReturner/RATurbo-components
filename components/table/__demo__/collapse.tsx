import React, { useEffect, useState } from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';
import Button from 'raturbo-components/lib/button';
import 'raturbo-components/lib/button/style';
import 'antd/dist/antd.css';
import { Tabs, Spin } from 'antd';

const { TabPane } = Tabs;

const dataSource = [
  { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
  { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
  { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
  { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
  { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
];

const dataSource1 = [
  { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
  { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
  { name: 'jim', age: 250, address: 'Sidney No. 1 Lake Park' },
  { name: 'jim', age: 2077, address: 'London No. 2 Lake Park' },
  { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'mary', age: 20, address: 'London No. 1 Lake Park' },
  { name: 'green', age: 2077, address: 'London No. 2 Lake Park' },
  { name: 'ezio', age: 18, address: 'New York No. 1 Lake Park' },
];

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData(dataSource);
    }, 1000);
  }, []);

  return (
    <div>
      <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
        collapsed
      </Button>
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          setData([]);
          setTimeout(() => {
            setData(dataSource1);
          }, 1000);
        }}
      >
        {['1', '2', '3'].map(tab => (
          <TabPane tab={`TAB ${tab}`} key={tab}>
            <Spin spinning={data.length === 0}>
              <Table
                dataSource={data}
                columns={[
                  { title: 'name1', dataKey: 'name', mergeRow: true, mergeVerticalCenter: true },
                  { title: 'age1', dataKey: 'age' },
                  { title: 'address1', dataKey: 'address' },
                ]}
              />
            </Spin>
          </TabPane>
        ))}
      </Tabs>
      <div></div>
    </div>
  );
};
