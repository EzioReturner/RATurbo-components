import React from 'react';
import Table from 'raturbo-components/lib/table';
import 'raturbo-components/lib/table/style';

const dataSource = [
  {
    name: 'ezio',
    age: 18,
    address: 'New York No. 1 Lake Park',
    column1: 'column1',
    column2: 'column2',
    column3: 'column3',
  },
  {
    name: 'mary',
    age: 20,
    address: 'London No. 1 Lake Park',
    column1: 'column1',
    column2: 'column2',
    column3: 'column3',
  },
  {
    name: 'jim',
    age: 250,
    address: 'Sidney No. 1 Lake Park',
    column1: 'column1',
    column2: 'column2',
    column3: 'column3',
  },
  {
    name: 'green',
    age: 2077,
    address: 'London No. 2 Lake Park',
    column1: 'column1',
    column2: 'column2',
    column3: 'column3',
  },
];

const color = { color: '#536ec2' };

export default () => (
  <Table
    dataSource={dataSource}
    customGroupHeader={(data, originNode) =>
      originNode(
        <div>
          {data.title}{' '}
          <span role="img" aria-label="">
            💻
          </span>
        </div>,
      )
    }
    columns={[
      {
        title: 'master',
        id: 'master',
        children: [
          {
            title: 'group',
            id: 'group',
            children: [
              {
                title: 'name',
                dataKey: 'name',
                id: '1',
                sorter: (a, b) => a.name.localeCompare(b.name),
              },
              {
                title: 'age',
                dataKey: 'age',
                defaultSortOrder: 'desc',
                id: '2',
                sorter: (a, b) => a.age - b.age,
              },
              {
                title: 'address',
                dataKey: 'address',
                id: '3',
                render: (data, originNode) => {
                  const { cellType, rowData } = data;
                  return cellType === 'header' ? (
                    originNode()
                  ) : (
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://github.com/EzioReturner/RATurbo-components"
                      style={color}
                    >
                      {rowData.address}
                      <span role="img" aria-label="">
                        🇨🇳
                      </span>
                    </a>
                  );
                },
              },
            ],
          },
          {
            title: 'group1',
            id: 'group1',
            children: [
              { title: 'column1', dataKey: 'column1', id: '4' },
              { title: 'column2', dataKey: 'column2', id: '5' },
              { title: 'column3', dataKey: 'column3', id: '6' },
            ],
          },
        ],
      },
    ]}
  />
);
