import React, { useContext, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { getDocument } from 'raturbo-components/lib/_utils/global';
import BodyContext from '../context/BodyContext';

/**
 * @name 通用数据列
 */

interface DataColumnProps {
  column: StoreKeyValue;
  slicedData?: any[];
}

const DataColumn: React.FC<DataColumnProps> = props => {
  const { pageData, prefixCls } = useContext(BodyContext);

  const { column, slicedData } = props;

  const _slicedData = (slicedData || pageData) as any[];

  const { render: renderCell, ...restInfo } = column;

  const { mergeRow, title: colTitle, $_groupIndex: colIndex, dataKey, align: colAlign } = restInfo;

  const measurekey = dataKey || colIndex;

  const measureCellRef = useCallback(
    (ref: HTMLDivElement | null, index: number) => {
      const now = _slicedData[index];
      const prev = _slicedData[index - 1];

      const asyncMeasure = async () => {
        let _mergeRow = false;

        if (index > 0 && mergeRow) {
          await new Promise(resolve =>
            setTimeout(() => {
              resolve(1);
            }, 0),
          ).then(() => {
            if (prev[measurekey] === now[measurekey]) {
              const _document = getDocument();

              if (_document) {
                const prevCol = _document.getElementById(`${prefixCls}-data-col-${colIndex - 1}`);

                if (prevCol) {
                  const prevCell = prevCol.querySelector(`#${prefixCls}-data-cell-${index}`);

                  if (prevCell && prevCell.className.indexOf(`${prefixCls}-data-cell-merge`) > 0) {
                    _mergeRow = true;
                  }
                } else {
                  _mergeRow = true;
                }
              }
            }
          });
        }

        const findLastNoMergeCell = (element: any): any => {
          if (element.previousElementSibling) {
            if (
              element.previousElementSibling.className.indexOf(`${prefixCls}-data-cell-merge`) < 0
            ) {
              return element.previousElementSibling;
            }
            return findLastNoMergeCell(element.previousElementSibling);
          }
          return null;
        };

        if (ref) {
          if (_mergeRow) {
            const ele = findLastNoMergeCell(ref);

            ref.className.indexOf(`${prefixCls}-data-cell-merge`) < 0 &&
              (ref.className = `${ref.className} ${prefixCls}-data-cell-merge`);

            ele && (ref.style.backgroundColor = getComputedStyle(ele).backgroundColor);

            setTimeout(() => {
              if (
                ref.nextElementSibling &&
                ref.nextElementSibling.className.indexOf(`${prefixCls}-data-cell-merge`) < 0 &&
                getComputedStyle(ref.nextElementSibling).backgroundColor ===
                  ref.style.backgroundColor
              ) {
                ref.style.borderBottom = '1px solid #f3f3f3';
              } else {
                ref.style.borderBottom = '';
              }
            }, 0);
          } else {
            ref.style.borderBottom = '';
            ref.style.backgroundColor = '';
            ref.className = ref.className.replace(`${prefixCls}-data-cell-merge`, '').trim();
          }
        }
      };

      asyncMeasure();
    },
    [mergeRow, _slicedData, measurekey],
  );

  const ColRender = useCallback(
    () => (
      <div
        className={`${prefixCls}-data-col`}
        key={colTitle}
        id={colIndex ? `${prefixCls}-data-col-${colIndex}` : undefined}
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
              ref={ref => measureCellRef(ref, index)}
            >
              {(renderCell &&
                renderCell(
                  {
                    ...restInfo,
                    cellType: 'data',
                    rowData: td,
                    rowIndex: index,
                    pageData: _slicedData,
                  },
                  CellNode,
                )) ||
                CellNode()}
            </div>
          );
        })}
      </div>
    ),
    [restInfo, _slicedData, colAlign, colIndex, measurekey, colTitle, measureCellRef, renderCell],
  );

  return <>{useMemo(() => ColRender(), [ColRender])}</>;
};

export default DataColumn;
