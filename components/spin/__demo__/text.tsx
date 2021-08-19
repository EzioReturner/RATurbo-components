import React from 'react';
import Aperture from 'react-feather/dist/icons/aperture';
import Spin from '../index';
import '../style';

const styles: React.CSSProperties = {
  height: '300px',
  position: 'relative',
  border: '1px dashed #a2a2a2',
  color: 'red',
};

const contentStyles: React.CSSProperties = {
  animation: 'roll 1s linear infinite forwards',
};

const red = {
  color: 'red',
};

export default () => (
  <div style={styles}>
    <Spin
      spinning
      content={<Aperture style={contentStyles} />}
      text={
        <span style={red} role="img" aria-label="">
          热烈庆祝中国🇨🇳共产党成立100周年
        </span>
      }
    />
  </div>
);
