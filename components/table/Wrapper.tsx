import React from 'react';
import classnames from 'classnames';
import EmptyData from 'raturbo-components/lib/empty';
import BodyContext from './context/BodyContext';
import BaseBody from './Body/BaseBody';

const TableWrapper: React.FC = () => {
  const { wrapperClassName, dataSource, fixedHeader, styles, prefixCls } = React.useContext(
    BodyContext,
  );
  // const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // useEffect(() => {
  // const _isMobile: any = isMobile(navigator.userAgent);
  // if (_isMobile.any) return;
  // const overEvent = (event: any) => {
  //   const target = event.target;
  //   if (target) {
  //     const rowIndex = target.getAttribute('data-row-index');
  //     rowIndex && setHoverIndex(Number(rowIndex));
  //   }
  // };
  // const outEvent = () => {
  //   setHoverIndex(null);
  // };
  // if (TableRef.current) {
  //   TableRef.current.addEventListener('mouseover', overEvent);
  //   TableRef.current.addEventListener('mouseout', outEvent);
  // }
  // return () => {
  //   if (TableRef.current) {
  //     /* eslint-disable */
  //     TableRef.current.removeEventListener('mouseover', overEvent);
  //     TableRef.current.removeEventListener('mouseout', outEvent);
  //     /* eslint-enable */
  //   }
  // };
  // }, []);

  const TableRef = React.useRef<HTMLDivElement>(null);

  const TableEmtpyHeight = React.useCallback(() => {
    if (dataSource.length === 0 && TableRef.current) {
      return {
        height: window.innerWidth > 700 ? '260px' : '150px',
      };
    }
    if (fixedHeader) {
      return {
        maxHeight: '100%',
      };
    }
    return {
      height: 'auto',
    };
  }, [dataSource.length, fixedHeader]);

  return (
    <div
      className={classnames(`${prefixCls}-wrapper`, wrapperClassName)}
      ref={TableRef}
      style={{
        ...TableEmtpyHeight(),
        ...(styles || {}),
      }}
    >
      <div className={`${prefixCls}-wrapper-content`}>
        <BaseBody />
      </div>
      {dataSource.length === 0 && (
        <EmptyData
          propStyle={{
            padding: '16px 0',
            position: 'absolute',
            width: '100%',
            pointerEvents: 'none',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '120px',
          }}
        />
      )}
    </div>
  );
};

export default TableWrapper;
