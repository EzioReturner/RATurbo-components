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
    score: 100,
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
    score: 0,
    parent: '-',
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
    colSummaryData={{ name: 'total', age: 18 + 20 + 250 + 2077, address: '-', score: 105 }}
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
    dataSource={dataSource}
    customGroupHeader={(data, originNode) =>
      originNode(
        <div>
          {data.title}
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
                title: 'content0',
                id: 'content0',
                children: [
                  { title: 'column1', dataKey: 'column1' },
                  { title: 'column2', dataKey: 'column2' },
                  { title: 'column3', dataKey: 'column3' },
                ],
              },
              {
                title: 'content1',
                id: 'content1',
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
                    headerRender: data => (
                      <div>
                        {data.cellData}
                        <span role="img" aria-label="">
                          🇨🇳
                        </span>
                      </div>
                    ),
                    render: data => {
                      const { cellData } = data;
                      return (
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href="https://github.com/EzioReturner/RATurbo-components"
                          style={color}
                        >
                          {cellData}
                          <span role="img" aria-label="">
                            🇨🇳
                          </span>
                        </a>
                      );
                    },
                  },
                ],
              },
            ],
          },
          {
            title: 'group1',
            id: 'group1',
            children: [
              {
                title: 'content3',
                id: 'content3',
                children: [
                  { title: 'column4', dataKey: 'column1' },
                  { title: 'column5', dataKey: 'column2' },
                  { title: 'column6', dataKey: 'column3' },
                ],
              },
              {
                title: 'content4',
                id: 'content4',
                children: [
                  { title: 'column7', dataKey: 'column1' },
                  { title: 'column8', dataKey: 'column2' },
                  { title: 'column9', dataKey: 'column3' },
                  { title: 'column10', dataKey: 'column4' },
                ],
              },
            ],
          },
        ],
      },
    ]}
  />
);
