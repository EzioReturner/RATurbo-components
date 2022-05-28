import React, { forwardRef } from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import { ColumnItem } from '../interface';
import ContentAreaHoc from './ContentAreaHoc';
import GroupHeaderHoc from './GroupHeaderHoc';

/**
 * @name 表格行&列生成器，可生成嵌套组合
 * @description 生成逻辑：由上至下递归创建，先创建column序列，并在每层column中生成row，row递归创建column，以此类推
 */
interface GenerateGroupProps {
  columnsData: ColumnItem[];
  contentRender: (column: ColumnItem) => React.ReactNode;
  area: 'header' | 'body';
  extraColumn?: React.ReactNode;
}

const GenerateGroup = forwardRef<any, GenerateGroupProps>((props, ref) => {
  const { columnsData, contentRender, area, extraColumn } = props;

  const { fixedSize, prefixCls } = React.useContext(BodyContext);

  const ColumnsGroup = React.useCallback(
    (data: ColumnItem[]) => {
      // 创建组合row
      function GroupRow(children: any[], parentIsLast: boolean, groupIndex: number) {
        return (
          <div
            className={classnames(
              `${prefixCls}-group-content-row`,
              parentIsLast && `${prefixCls}-last-group-content-row`,
            )}
          >
            {children.map((_cl, _index) => {
              const _lastItem = parentIsLast && _index === children.length - 1;
              return GroupColumn(_cl, _lastItem, groupIndex);
            })}
          </div>
        );
      }

      // 创建组合column
      function GroupColumn(child: any, _lastItem: boolean, groupIndex: number) {
        return (
          <div
            className={classnames(
              `${prefixCls}-group-content-column`,
              _lastItem && `${prefixCls}-last-group-content-column`,
            )}
            key={child.id || child.dataKey || child.title}
          >
            {child.children ? (
              <>
                <GroupHeaderHoc colData={child} />
                {GroupRow(child.children, _lastItem, groupIndex)}
              </>
            ) : (
              <ContentAreaHoc lastArea={_lastItem} column={child} area={area}>
                {contentRender(child)}
              </ContentAreaHoc>
            )}
          </div>
        );
      }

      const CreateGroup = (_data: ColumnItem, index: number, len: number) => {
        const groupIndex = index;

        const parentIsLast = index === len - 1;

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
            {GroupColumn(_data, parentIsLast, groupIndex)}
          </div>
        );
      };

      // 创建列容器
      const ColumnsContainerV2 = (_columnsData: ColumnItem[]) => (
        <div className={`${prefixCls}-columns-container`} ref={ref}>
          {_columnsData.map((v_c, index) => CreateGroup(v_c, index, _columnsData.length))}
          {extraColumn}
        </div>
      );

      return data.length > 0 ? ColumnsContainerV2(data) : null;
    },
    [fixedSize, contentRender, ref, area, extraColumn, prefixCls],
  );

  return <>{React.useMemo(() => ColumnsGroup(columnsData), [ColumnsGroup, columnsData])}</>;
});

export default GenerateGroup;
