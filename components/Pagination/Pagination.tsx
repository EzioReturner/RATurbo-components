import React, { useEffect, useState } from 'react';
import ChevronsRight from 'react-feather/dist/icons/chevron-right';
import ChevronsLeft from 'react-feather/dist/icons/chevron-left';
import classnames from 'classnames';
import t from 'prop-types';
import { PaginationProps } from './interface';

const prefixCls = 'tc-pagination';

const Pagination: React.FC<PaginationProps> = props => {
  const { total, current: propsCurrent, onChange, pageSize } = props;

  const pageSizeVal = pageSize || 10;

  const totalPage = Math.ceil(total / pageSizeVal);

  const [current, setCurrent] = useState(propsCurrent || 1);

  const currentVal = propsCurrent || current;

  const handleChangePage = (page: number) => {
    if (onChange) {
      onChange(page);
    }
    if (!propsCurrent) {
      setCurrent(page);
    }
  };

  const bindEvent = () => {
    const bl = document.getElementById(`${prefixCls}-button-left`);
    const br = document.getElementById(`${prefixCls}-button-right`);

    bl?.addEventListener('touchstart', () => {
      bl.className += ' touched';
    });

    bl?.addEventListener('touchend', () => {
      bl.className = bl.className.replace(' touched', '');
    });

    br?.addEventListener('touchstart', () => {
      br.className += ' touched';
    });

    br?.addEventListener('touchend', () => {
      br.className = br.className.replace(' touched', '');
    });
  };

  useEffect(() => {
    bindEvent();
  }, []);

  const LeftButton = (
    <div
      className={classnames(`${prefixCls}-button-left`, currentVal === 1 && 'disabled')}
      id={`${prefixCls}-button-left`}
      onClick={() => currentVal > 1 && handleChangePage(currentVal - 1)}
    >
      <ChevronsLeft className={`${prefixCls}-button-icon`} />
      <span className={`${prefixCls}-button-text`}>上一页</span>
    </div>
  );

  const RightButton = (
    <div
      className={classnames(
        `${prefixCls}-button-right`,
        (currentVal === totalPage || totalPage === 0) && 'disabled',
      )}
      id={`${prefixCls}-button-right`}
      onClick={() => currentVal < totalPage && totalPage !== 0 && handleChangePage(currentVal + 1)}
    >
      <span className={`${prefixCls}-button-text`}>下一页</span>
      <ChevronsRight className={`${prefixCls}-button-icon`} />
    </div>
  );

  const PageList = (
    <div className={`${prefixCls}-page-wrap`}>
      <span className={`${prefixCls}-page-wrap-current`}>{currentVal}</span>
      <span className={`${prefixCls}-page-wrap-total`}>/{totalPage}</span>
    </div>
  );

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-container`}>
        {LeftButton}
        {PageList}
        {RightButton}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  total: t.number.isRequired,
  pageSize: t.number,
  current: t.number,
  onChange: t.func,
};

export default Pagination;
