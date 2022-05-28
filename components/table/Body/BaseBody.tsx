import React, { useRef, useCallback, useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import RowSummary from '../Summary/RowSummary';
import IndexCol from '../IndexColumn';
import GenerateGroup from '../Components/GenerateGroup';
import CellColumn from '../CellColumn';
import { ColumnItem } from '../interface';
import { debounce } from '../utils/debounce';
import ColSummaryCell from '../Summary/ColSummaryCell';

const ColumnHeader = CellColumn.Header;

/**
 * @name 表格body区域，集成事件与渲染
 */

type DirectionProps = 'right' | 'left' | 'up' | 'down';

const BaseBody: React.FC = () => {
  const {
    showIndex,
    rowSummaryCol,
    cellLeafs,
    headerLeafs,
    fixedSize,
    pageData,
    groupDeep,
    renderId,
    autoFillGroup,
    prefixCls,
  } = useContext(BodyContext);

  const [resize, setResize] = useState(
    Math.random()
      .toString(36)
      .substr(2),
  );

  const headerFlowRef = useRef<HTMLDivElement | null>(null);

  const headerContainerRef = useRef<HTMLDivElement | null>(null);

  const indexHeaderRef = useRef<HTMLDivElement | null>(null);

  const indexCellRef = useRef<HTMLDivElement | null>(null);

  const rowSummaryHeaderRef = useRef<HTMLDivElement | null>(null);

  const rowSummaryCellRef = useRef<HTMLDivElement | null>(null);

  const cellFlowRef = useCallback(
    (node: HTMLDivElement) => {
      if (node && headerFlowRef.current) {
        const isMac = navigator.userAgent.indexOf('Mac') > -1;

        if (node.scrollHeight > node.clientHeight && node.scrollHeight - node.clientHeight <= 5) {
          node.style.overflowX = 'hidden';
        }

        const canScrollWidth =
          headerFlowRef.current.scrollWidth - headerFlowRef.current.clientWidth;

        if (canScrollWidth === 0) {
          node.style.overflowX = 'hidden';
        } else {
          node.style.overflowX = 'auto';
        }

        node.addEventListener('scroll', e => {
          if (headerFlowRef.current) {
            /**
             * @todo 此处需要优化鼠标拖动滚动条到右侧顶部时会触发回弹
             */
            // 存在垂直滚动条时，锁定cell与header的滚动值同步
            if (node.scrollLeft >= canScrollWidth) {
              setTimeout(() => {
                node.scrollLeft = canScrollWidth;
              }, 0);
            }

            headerFlowRef.current.scrollLeft = node.scrollLeft;

            if (fixedSize) {
              if (showIndex && indexCellRef.current) {
                indexCellRef.current.scrollTop = node.scrollTop;
              }
              const cellFixedGroup =
                node.querySelectorAll(
                  `.${prefixCls}-columns-group.${prefixCls}-mark-fixed-group`,
                ) || [];
              for (let i = 0; i < cellFixedGroup.length; i++) {
                const cellChild = cellFixedGroup[i].querySelector(
                  `.${prefixCls}-group-content-column`,
                );
                cellChild && (cellChild.scrollTop = node.scrollTop);
              }
            }
          }
        });

        node.addEventListener('wheel', e => {
          if (node.clientHeight === node.scrollHeight) {
            return;
          }
          e.preventDefault();

          let { deltaX } = e;
          let { deltaY } = e;

          // 如果XY都有拖动量，则取绝对值最大者
          if (Math.abs(deltaX) !== 0 && Math.abs(deltaY) !== 0) {
            if (deltaX === deltaY) {
              return;
            }
            if (Math.abs(deltaX) < Math.abs(deltaY)) {
              deltaX = 0;
            } else {
              deltaY = 0;
            }
          }
          let direction: DirectionProps = 'right';
          let delta = 0;
          const DirectionMirror = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up',
          };
          if (deltaX < 0) {
            direction = 'right';
            delta = deltaX;
          } else if (deltaX > 0) {
            direction = 'left';
            delta = deltaX;
          } else if (deltaY > 0) {
            direction = 'up';
            delta = deltaY;
          } else if (deltaY < 0) {
            direction = 'down';
            delta = deltaY;
          }

          direction = (isMac ? DirectionMirror[direction] : direction) as DirectionProps;

          if (!headerFlowRef.current) {
            return;
          }

          if (direction === 'up' || direction === 'down') {
            node.scrollTop += delta;

            if (fixedSize) {
              if (showIndex && indexCellRef.current) {
                indexCellRef.current.scrollTop = node.scrollTop;
              }
              const cellFixedGroup =
                node.querySelectorAll(
                  `.${prefixCls}-columns-group.${prefixCls}-mark-fixed-group`,
                ) || [];
              for (let i = 0; i < cellFixedGroup.length; i++) {
                const cellChild = cellFixedGroup[i].querySelector(
                  `.${prefixCls}-group-content-column`,
                );
                cellChild && (cellChild.scrollTop = node.scrollTop);
              }
            }
          } else {
            // 存在垂直滚动条时，锁定cell与header的滚动值同步
            const _canScrollWidth =
              headerFlowRef.current.scrollWidth - headerFlowRef.current.clientWidth;

            if (delta > 0 && headerFlowRef.current.scrollLeft + delta >= _canScrollWidth) {
              node.scrollLeft = _canScrollWidth;
              headerFlowRef.current.scrollLeft = _canScrollWidth;
              return;
            }
            headerFlowRef.current.scrollLeft = node.scrollLeft + delta;
            node.scrollLeft = headerFlowRef.current.scrollLeft;
          }
        });
      }
    },
    [fixedSize, showIndex, prefixCls],
  );

  const getDomWidth = (dom: HTMLElement) => {
    const defWidth = dom.getAttribute('data-style-width');
    if (defWidth) {
      return defWidth;
    }
    return `${Math.ceil(dom.clientWidth)}px`;
  };

  const measureDomWidth = useCallback(
    (cellElement: HTMLElement | null, headerElement: HTMLElement | null): number => {
      if (cellElement && headerElement && headerFlowRef.current) {
        const cellWidth = getDomWidth(cellElement);
        const headerWidth = getDomWidth(headerElement);

        const width =
          Math.ceil(Number(cellWidth.replace(/(px)|%/g, ''))) >
          Math.ceil(Number(headerWidth.replace(/(px)|%/g, '')))
            ? cellWidth
            : headerWidth;

        headerElement.style.width = width;
        cellElement.style.width = width;

        const containerWidth = headerFlowRef.current.clientWidth;

        if (width.indexOf('%') > -1) {
          return (containerWidth * Number(width.replace('%', ''))) / 100;
        }

        return Number(width.replace(/(px)/, ''));
      }

      return 0;
    },
    [],
  );

  const resetWidth = useCallback(
    (cellElement: HTMLElement | null, headerElement: HTMLElement | null) => {
      if (cellElement && headerElement) {
        headerElement.style.width = 'auto';
        cellElement.style.width = 'auto';
      }
    },
    [],
  );

  // 弹性调整表格宽度
  const flexGroupWidth = useCallback((group: any[], groupTotalWidth: number, lackWidth: number) => {
    if (headerFlowRef.current) {
      const containerWidth = headerFlowRef.current.clientWidth;

      const groupNum = group.length;

      let actualFlexWidthGroup: any[] | null = [];

      // 理论可弹性宽度
      let theoreticFlexWidth = groupTotalWidth + lackWidth;
      // 理论需要弹性宽度的元素数量
      let theoreticFlexNum = groupNum;

      const groupWidthArr: number[] = [];

      // 固定宽度的元素需要单独计算过滤
      for (let i = 0; i < group.length; i++) {
        const cellElement: HTMLElement = group[i];
        const defWidth = cellElement.getAttribute('data-style-width');
        if (defWidth) {
          let actualDefWidth = 0;
          if (defWidth.indexOf('%') > -1) {
            actualDefWidth = Math.floor(
              (Number(defWidth.replace(/[^\d]/g, '')) / 100) * containerWidth,
            );
          } else {
            actualDefWidth = Math.floor(Number(defWidth.replace(/[^\d]/g, '')));
          }

          theoreticFlexWidth -= actualDefWidth;
          theoreticFlexNum--;
          continue;
        } else {
          groupWidthArr.push(cellElement.clientWidth);
          actualFlexWidthGroup.push(cellElement);
        }
      }

      if (theoreticFlexNum === 0) return;

      // 理论平均宽度
      let theoreticAverageWidth = Math.floor(theoreticFlexWidth / theoreticFlexNum);

      const recursiveFuc = () => {
        if (!actualFlexWidthGroup) return;

        for (let i = 0; i < actualFlexWidthGroup.length; i++) {
          const element = actualFlexWidthGroup[i];
          if (element.clientWidth >= theoreticAverageWidth) {
            theoreticFlexWidth -= element.clientWidth;
            theoreticFlexNum--;

            actualFlexWidthGroup.splice(i, 1);
            theoreticAverageWidth = Math.floor(theoreticFlexWidth / theoreticFlexNum);
            break;
          }
        }
      };

      // 所有剩余元素都小于理论宽度时停止，否则继续计算最小理论平均宽度
      while (actualFlexWidthGroup.some(ele => ele.clientWidth >= theoreticAverageWidth)) {
        recursiveFuc();
      }

      // 实际需要弹性宽度的元素数量
      const actualFlexNum = theoreticFlexNum;

      // 实际平均弹性宽度
      const actualAverageWidth = Math.floor(lackWidth / actualFlexNum);

      for (let j = 0; j < actualFlexWidthGroup.length; j++) {
        const cellElement = actualFlexWidthGroup[j];
        const headerElement: HTMLElement | null = cellElement.id
          ? headerFlowRef.current.querySelector(`#${cellElement.id}`)
          : null;
        const width = `${cellElement.clientWidth + actualAverageWidth}px`;
        if (headerElement) {
          headerElement.style.width = width;
          cellElement.style.width = width;
        }
      }

      actualFlexWidthGroup = null;
    }
  }, []);

  const checkGroupWidth = useCallback(
    (node: any) => {
      if (headerFlowRef.current) {
        const containerWidth = headerFlowRef.current.clientWidth;

        // group 总宽度不包含index与summary
        let groupTotalWidth = 0;

        let indexWidth = 0;
        // summary所属group宽度
        let summaryWidth = 0;

        if (showIndex) {
          resetWidth(indexCellRef.current, indexHeaderRef.current);
          indexWidth = measureDomWidth(indexCellRef.current, indexHeaderRef.current);
        }

        if (rowSummaryCol) {
          const summaryCell =
            rowSummaryCellRef.current?.querySelectorAll(`.${prefixCls}-content-area`) || [];
          const summaryheader =
            rowSummaryHeaderRef.current?.querySelectorAll(`.${prefixCls}-content-area`) || [];
          if (summaryCell && summaryheader) {
            for (let i = 0; i < summaryCell.length; i++) {
              const cell = summaryCell[i];
              const header = summaryheader[i];
              resetWidth(cell as HTMLElement, header as HTMLElement);
              const _summaryWidth = measureDomWidth(cell as HTMLElement, header as HTMLElement);
              summaryWidth += _summaryWidth;
            }
          }
        }

        let group: any[] | null = node.querySelectorAll(`.${prefixCls}-content-area`) || [];

        if (!group) return;
        // 初次计算并对齐所有group
        for (let i = 0; i < group.length; i++) {
          const cellElement: HTMLElement = group[i];

          const headerElement: HTMLElement | null = cellElement.id
            ? headerFlowRef.current.querySelector(`#${cellElement.id}`)
            : null;
          resetWidth(cellElement, headerElement);
          const dataColWidth = measureDomWidth(cellElement, headerElement);

          groupTotalWidth += dataColWidth;
        }

        const lackWidth = Math.floor(containerWidth - groupTotalWidth - indexWidth - summaryWidth);

        // 如果总group宽度小于容器宽度，则需要自动扩充group宽度
        if (autoFillGroup && lackWidth > 0) {
          flexGroupWidth(group, groupTotalWidth, lackWidth);

          group = null;
        }
      }
    },
    [
      measureDomWidth,
      resetWidth,
      rowSummaryCol,
      showIndex,
      autoFillGroup,
      flexGroupWidth,
      prefixCls,
    ],
  );

  // 固定冻结区域的高度和定位
  const checkFixeGroup = useCallback(
    (node: any) => {
      if (!headerContainerRef.current || !headerFlowRef.current) {
        return;
      }
      if (fixedSize) {
        let baseLeftWidth = -1;
        if (showIndex && indexCellRef.current && indexHeaderRef.current) {
          indexHeaderRef.current.style.position = 'absolute';
          indexHeaderRef.current.style.left = '-1px';

          Object.assign(indexCellRef.current.style, {
            position: 'absolute',
            left: '-1px',
            height: `${node.clientHeight}px`,
            overflow: 'hidden',
          });
          baseLeftWidth += indexHeaderRef.current.clientWidth;
        }

        const cellFixedGroup =
          node.querySelectorAll(`.${prefixCls}-columns-group.${prefixCls}-mark-fixed-group`) || [];

        const headerFixedGroup =
          headerContainerRef.current.querySelectorAll(
            `.${prefixCls}-columns-group.${prefixCls}-mark-fixed-group`,
          ) || [];

        for (let i = 0; i < cellFixedGroup.length; i++) {
          if (headerFixedGroup[i]) {
            const headerElement = headerFixedGroup[i] as HTMLElement;
            headerElement.style.position = 'absolute';
            headerElement.style.left = `${baseLeftWidth}px`;
          }
          if (cellFixedGroup[i]) {
            Object.assign(cellFixedGroup[i].style, {
              position: 'absolute',
              left: `${baseLeftWidth}px`,
              height: `${node.clientHeight}px`,
            });
            const cellChild = cellFixedGroup[i].querySelector(`.${prefixCls}-group-content-column`);
            cellChild &&
              Object.assign(cellChild.style, {
                overflow: 'hidden',
                height: '100%',
              });
            baseLeftWidth += cellFixedGroup[i].clientWidth;
          }
          setTimeout(() => {
            node.style.marginLeft = `${baseLeftWidth}px`;
            headerContainerRef.current &&
              (headerContainerRef.current.style.marginLeft = `${baseLeftWidth}px`);
          }, 0);
        }
      } else {
        // 重置样式
        if (showIndex && indexCellRef.current && indexHeaderRef.current) {
          Object.assign(indexCellRef.current.style, {
            position: 'static',
            height: 'auto',
            overflow: 'unset',
          });
          indexHeaderRef.current.style.position = 'static';
        }
        const cellFixedGroup = node.querySelectorAll(`.${prefixCls}-columns-group`) || [];
        const headerFixedGroup =
          headerContainerRef.current.querySelectorAll(`.${prefixCls}-columns-group`) || [];
        for (let i = 0; i < cellFixedGroup.length; i++) {
          if (cellFixedGroup[i]) {
            cellFixedGroup[i].style.position = 'static';
            cellFixedGroup[i].style.height = 'auto';
            const cellChild = cellFixedGroup[i].querySelector(`.${prefixCls}-group-content-column`);

            cellChild &&
              Object.assign(cellChild.style, {
                overflow: 'unset',
                height: 'auto',
              });
          }
          if (headerFixedGroup[i]) {
            const headerElement = headerFixedGroup[i] as HTMLElement;
            headerElement.style.position = 'static';
          }
        }
        headerContainerRef.current.style.marginLeft = '0';
        node.style.marginLeft = '0';
      }
    },
    [showIndex, fixedSize, prefixCls],
  );

  // 对齐所有数据列与头部
  const cellContainerRef = useCallback(
    (node: any) => {
      if (node && headerFlowRef.current) {
        checkGroupWidth(node);
        setTimeout(() => {
          checkFixeGroup(node);
        }, 10);
      }
    },
    // eslint-disable-next-line
    [renderId, resize],
  );

  useEffect(() => {
    const checkWindowResize = debounce(() => {
      setResize(
        Math.random()
          .toString(36)
          .substr(2),
      );
    });

    window.addEventListener('resize', checkWindowResize);

    return () => window.removeEventListener('resize', checkWindowResize);
  }, [checkGroupWidth, checkFixeGroup]);

  return (
    <div
      className={classnames(
        `${prefixCls}-flow-body`,
        groupDeep === 0 && `${prefixCls}-flow-group-deep-zero`,
        pageData.length % 2 === 0 ? `${prefixCls}-even-row` : `${prefixCls}-odd-row`,
      )}
    >
      <div className={`${prefixCls}-header-flow`} ref={headerFlowRef}>
        {showIndex && <IndexCol.Header ref={indexHeaderRef} />}
        <GenerateGroup
          ref={headerContainerRef}
          area="header"
          columnsData={headerLeafs}
          contentRender={column => <ColumnHeader column={column} />}
          extraColumn={rowSummaryCol && <RowSummary.Header ref={rowSummaryHeaderRef} />}
        />
      </div>
      <div className={`${prefixCls}-cell-flow`} id={`${prefixCls}-cell-flow`} ref={cellFlowRef}>
        {showIndex && <IndexCol ref={indexCellRef} />}
        <GenerateGroup
          ref={cellContainerRef}
          area="body"
          columnsData={cellLeafs}
          contentRender={column => (
            <CellColumn
              header={false}
              column={column as ColumnItem}
              extraCell={<ColSummaryCell column={column} />}
            />
          )}
          extraColumn={rowSummaryCol && <RowSummary hideTitle ref={rowSummaryCellRef} />}
        />
        {}
      </div>
    </div>
  );
};

export default BaseBody;
