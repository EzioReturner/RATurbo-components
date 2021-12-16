import React, { useContext, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { getDocument } from 'raturbo-components/lib/_utils/global';
import BodyContext from '../context/BodyContext';
import { ColumnItem, CellRenderProps } from '../interface';

/**
 * @name 表格数据区域
 */

interface DataColumnProps {
  column: ColumnItem;
  slicedData?: any[];
}

const DataColumn: React.FC<DataColumnProps> = props => {
  const { pageData, prefixCls } = useContext(BodyContext);

  const { column, slicedData } = props;

  const _slicedData = (slicedData || pageData) as any[];

  const { render: renderCell, ...restInfo } = column;

  const { mergeRow, title: colTitle, $_groupIndex: colIndex, dataKey, align: colAlign } = restInfo;

  const measurekey = dataKey || colIndex;

  // 对合并的单元格进行class标记，并区分starter 和 ender
  const patchMatchGroup = useCallback(
    (matchGroup: any[]) => {
      const prevEle = matchGroup[0].previousElementSibling;

      if (prevEle) {
        prevEle.className.indexOf(`${prefixCls}-data-cell-merge-starter`) < 0 &&
          (prevEle.className = `${prevEle.className} ${prefixCls}-data-cell-merge-starter`);
      }

      for (let i = 0; i < matchGroup.length; i++) {
        const element = matchGroup[i];
        element.className = `${element.className} ${prefixCls}-data-cell-merged ${
          i === matchGroup.length - 1 ? `${prefixCls}-data-cell-merge-ender` : ''
        }`.trim();
      }
    },
    [prefixCls],
  );

  const measureColRef = useCallback(
    async (ref: HTMLDivElement | null) => {
      if (ref && mergeRow) {
        const childList = ref.childNodes;
        let matchValue = '';

        let matchGroup = [];

        for (let i = 0; i < childList.length; i++) {
          const child = childList[i] as any;

          child.className = child.className
            .split(' ')
            .filter(
              (cn: string) =>
                ![
                  `${prefixCls}-data-cell-merged`,
                  `${prefixCls}-data-cell-merge-starter`,
                  `${prefixCls}-last-data-cell-merged`,
                ].includes(cn),
            )
            .join(' ');

          // 找到数据相同的相邻单元格
          if (_slicedData[i][measurekey] === matchValue) {
            matchGroup.push(child);
          } else {
            matchGroup.length > 0 && patchMatchGroup(matchGroup);
            matchGroup = [];
          }

          matchValue = _slicedData[i][measurekey];

          if (i === childList.length - 1 && matchGroup.length > 0) {
            patchMatchGroup(matchGroup);
          }
        }
      }
    },
    [mergeRow, _slicedData, measurekey, patchMatchGroup],
  );

  const ColRender = useCallback(
    () => (
      <div
        className={`${prefixCls}-data-col`}
        key={colTitle}
        id={colIndex ? `${prefixCls}-data-col-${colIndex}` : undefined}
        ref={ref => measureColRef(ref)}
      >
        {_slicedData.map((td, index) => {
          const CellNode = (text?: string | number | React.ReactNode) => (
            <div className={`${prefixCls}-row-text`} style={{ textAlign: colAlign }}>
              {text || td[measurekey]}
            </div>
          );

          return (
            <div
              className={classnames(`${prefixCls}-data-cell`)}
              id={`${prefixCls}-data-cell-${index}`}
              key={index}
            >
              {(renderCell &&
                renderCell(
                  {
                    ...restInfo,
                    cellData: td[measurekey],
                    rowData: td,
                    rowIndex: index,
                    pageData: _slicedData,
                  } as CellRenderProps,
                  CellNode,
                )) ||
                CellNode()}
            </div>
          );
        })}
      </div>
    ),
    [restInfo, _slicedData, colAlign, colIndex, measurekey, colTitle, renderCell],
  );

  return <>{useMemo(() => ColRender(), [ColRender])}</>;
};

export default DataColumn;
