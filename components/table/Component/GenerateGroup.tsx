import React, { forwardRef } from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import { ColumnItem } from '../interface';
import ColRenderHoc from './ColRenderHoc';

interface GenerateGroupProps {
  columnsData: ColumnItem[];
  contentRender: (column: ColumnItem) => React.ReactNode;
  area: 'header' | 'body';
}

const GenerateGroup = forwardRef<any, GenerateGroupProps>((props, ref) => {
  const { columnsData, contentRender, area } = props;

  const { fixedSize, customGroupHeader, prefixCls } = React.useContext(BodyContext);

  const ColumnsGroup = React.useCallback(
    (data: ColumnItem[]) => {
      // 创建列组合内容
      const ColContentRender = (column: ColumnItem, _lastItem: boolean) => (
        <ColRenderHoc prefixCls={prefixCls} lastArea={_lastItem} column={column} area={area}>
          {contentRender(column)}
        </ColRenderHoc>
      );

      // 列头部
      const GroupHeader = (colData: StoreKeyValue) => {
        const node = (nodeTitle?: React.ReactNode) => (
          <div
            className={`${prefixCls}-data-cell ${prefixCls}-header ${prefixCls}-group-header-cell`}
          >
            <span
              style={{
                width: '100%',
                textAlign: colData.align,
                display: 'inline-block',
              }}
            >
              {nodeTitle || colData.title}
            </span>
          </div>
        );

        return (
          (customGroupHeader &&
            customGroupHeader(colData, (nodeTitle?: React.ReactNode) => node(nodeTitle))) ||
          node()
        );
      };

      // 创建列组合
      const GroupContent = (children: any[], parentIsLast: boolean, groupIndex: number) => (
        <div
          className={classnames(
            `${prefixCls}-column-group-content`,
            children.every(_c => !_c.children) && `${prefixCls}-column-group-title`,
          )}
        >
          {children.map((_cl, _index) => {
            const _lastItem = parentIsLast && _index === children.length - 1;
            return (
              <div
                className={classnames(
                  `${prefixCls}-column-group-item`,
                  _lastItem && `${prefixCls}-column-group-last-item`,
                )}
                key={_cl.id || _cl.dataKey || _cl.title}
              >
                {_cl.children ? (
                  <>
                    {GroupHeader(_cl)}
                    {GroupContent(_cl.children, _lastItem, groupIndex)}
                  </>
                ) : (
                  ColContentRender(_cl, _lastItem)
                )}
              </div>
            );
          })}
        </div>
      );

      const CreateGroup = (_data: ColumnItem, index: number, len: number) => {
        const { children } = _data;

        const groupIndex = index;

        const parentIsLast = index === len - 1;

        const Group = (
          <div
            className={classnames(
              `${prefixCls}-column-group`,
              index === len - 1 && `${prefixCls}-last-column-group`,
            )}
          >
            {children ? (
              <>
                {GroupHeader(_data)}
                {GroupContent(children, parentIsLast, groupIndex)}
              </>
            ) : (
              ColContentRender(_data, parentIsLast)
            )}
          </div>
        );

        return (
          <div
            className={classnames(
              `${prefixCls}-columns-group`,
              index === len - 1 && `${prefixCls}-last-columns-group`,
              fixedSize > index && `${prefixCls}-mark-fixed-group`,
              fixedSize === index + 1 && `${prefixCls}-fixed-shadow`,
            )}
            key={index}
          >
            {Group}
          </div>
        );
      };

      // 创建列容器
      const ColumnsContainerV2 = (_columnsData: ColumnItem[]) => (
        <div className={`${prefixCls}-columns-container`} ref={ref}>
          {_columnsData.map((v_c, index) => CreateGroup(v_c, index, _columnsData.length))}
        </div>
      );

      return data.length > 0 ? ColumnsContainerV2(data) : null;
    },
    [customGroupHeader, fixedSize, contentRender, ref, area],
  );

  return <>{React.useMemo(() => ColumnsGroup(columnsData), [ColumnsGroup, columnsData])}</>;
});

export default GenerateGroup;
