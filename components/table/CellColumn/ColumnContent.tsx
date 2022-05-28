import React, { useContext, useCallback } from 'react';
import classnames from 'classnames';
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
  const { pageData, prefixCls, renderId, uniqId } = useContext(BodyContext);

  const { column, slicedData } = props;

  const _slicedData = (slicedData || pageData) as any[];

  const { render: renderCell, ...restInfo } = column;

  const {
    mergeRow,
    mergeVerticalCenter,
    mergeAlignPrevCol,
    title: colTitle,
    $_groupIndex: colIndex,
    dataKey,
    align: colAlign,
  } = restInfo;

  const measurekey = dataKey || colIndex;

  // 对携带 mergeAlignCenter 字段的列进行居中处理，隐藏 merged单元格，增大starter高度
  const verticalAlignCenterStarterCell = useCallback(
    (dom: any, mergeLen: number) => {
      const eleRenderId = dom.getAttribute('data-renderId');

      const height = dom.getAttribute('data-origin-height');

      /**
       * @description 处理高度坍缩问题
       */
      if (!eleRenderId && dom.clientHeight && !height) {
        dom.setAttribute('data-origin-height', dom.offsetHeight);
      }

      if (eleRenderId !== renderId && height) {
        dom.setAttribute('data-renderId', renderId);

        dom.style.height = `${mergeLen * height}px`;
        dom.style.lineHeight = `${mergeLen * height}px`;
      }
    },
    [renderId],
  );

  const copyPrevColCellClass = useCallback(
    (dom: any) => {
      const preColCell = document.querySelector(
        `#${prefixCls}-data-col-${colIndex - 1}-${uniqId}>#${dom.id}`,
      );
      if (preColCell) {
        dom.className = preColCell.className;
      }
    },
    [colIndex, uniqId, prefixCls],
  );

  // 对齐前一列
  const alignPrevCol = useCallback(
    (matchGroup: any[]) => {
      const prevEle = matchGroup[0].previousElementSibling;

      const displayGroup = [prevEle, ...matchGroup].filter(Boolean);

      for (let i = 0; i < displayGroup.length; i++) {
        copyPrevColCellClass(displayGroup[i]);
      }

      const lastEle = matchGroup[matchGroup.length - 1];

      if (
        lastEle.className.indexOf(`${prefixCls}-data-cell-merged`) > -1 &&
        lastEle.className.indexOf(`${prefixCls}-data-cell-merge-ender`) < 0
      ) {
        lastEle.className = `${lastEle.className} ${prefixCls}-data-cell-merge-ender`;
      }

      if (mergeVerticalCenter) {
        let starter = null;
        let count = 0;

        for (let i = 0; i < displayGroup.length; i++) {
          const element = displayGroup[i];

          if (element.className.indexOf(`${prefixCls}-data-cell-merge-starter`) > -1) {
            starter = element;
          }

          if (starter) {
            count++;
          }

          if (element.className.indexOf(`${prefixCls}-data-cell-merge-ender`) > -1) {
            verticalAlignCenterStarterCell(starter, count);
            starter = null;
            count = 0;
          }
        }
      }
    },
    [copyPrevColCellClass, mergeVerticalCenter, prefixCls, verticalAlignCenterStarterCell],
  );

  // 对合并的单元格进行class标记，并区分starter 和 ender
  const patchMatchGroup = useCallback(
    (matchGroup: any[]) => {
      if (mergeAlignPrevCol) {
        alignPrevCol(matchGroup);
      } else {
        const prevEle = matchGroup[0].previousElementSibling;

        if (prevEle) {
          prevEle.className.indexOf(`${prefixCls}-data-cell-merge-starter`) < 0 &&
            (prevEle.className = `${prevEle.className} ${prefixCls}-data-cell-merge-starter`);

          if (mergeVerticalCenter) {
            verticalAlignCenterStarterCell(prevEle, matchGroup.length + 1);
          }
        }

        for (let i = 0; i < matchGroup.length; i++) {
          const element = matchGroup[i];
          element.className = `${element.className} ${prefixCls}-data-cell-merged ${
            i === matchGroup.length - 1 ? `${prefixCls}-data-cell-merge-ender` : ''
          }`.trim();
        }
      }
    },
    [
      prefixCls,
      alignPrevCol,
      mergeAlignPrevCol,
      mergeVerticalCenter,
      verticalAlignCenterStarterCell,
    ],
  );

  const resetDomStyleAndClass = useCallback(
    (dom: any) => {
      const eleRenderId = dom.getAttribute('data-renderId');

      if (eleRenderId !== renderId) {
        dom.className = dom.className
          .split(' ')
          .filter(
            (cn: string) =>
              ![
                `${prefixCls}-data-cell-merged`,
                `${prefixCls}-data-cell-merge-starter`,
                `${prefixCls}-data-cell-merge-ender`,
              ].includes(cn),
          )
          .join(' ');

        const height = dom.getAttribute('data-origin-height');

        if (height) {
          dom.style.height = `${height}px`;
          dom.style.lineHeight = `${height}px`;
        }
      }
    },
    [prefixCls, renderId],
  );

  const measureColRef = useCallback(
    async (ref: HTMLDivElement | null) => {
      if (ref && mergeRow) {
        const childList = ref.childNodes;
        let matchValue = '';

        let matchGroup = [];

        for (let i = 0; i < childList.length; i++) {
          const child = childList[i] as any;

          const cellData = _slicedData[i][measurekey];

          resetDomStyleAndClass(child);

          // 找到数据相同的相邻单元格
          if (cellData === matchValue) {
            matchGroup.push(child);
          } else {
            matchGroup.length > 0 && patchMatchGroup(matchGroup);
            matchGroup = [];
          }

          matchValue = cellData;

          if (i === childList.length - 1 && matchGroup.length > 0) {
            patchMatchGroup(matchGroup);
          }
        }
      }
    },
    [mergeRow, _slicedData, measurekey, patchMatchGroup, resetDomStyleAndClass],
  );

  return (
    <div
      className={classnames(
        `${prefixCls}-data-col`,
        mergeRow && mergeVerticalCenter && `${prefixCls}-cell-merged-vertical-center`,
      )}
      key={colTitle}
      id={colIndex !== undefined ? `${prefixCls}-data-col-${colIndex}-${uniqId}` : undefined}
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
  );
};

export default DataColumn;
