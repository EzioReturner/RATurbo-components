import React, { useState } from 'react';
import IconEdit from 'react-feather/dist/icons/edit-3';
import IconCopy from 'react-feather/dist/icons/copy';
import IconCode from 'react-feather/dist/icons/code';
import Highlight from 'react-highlight';
import classnames from 'classnames';
import 'highlight.js/styles/a11y-light.css';
import './index.less';

interface DocBoxProps {
  title: string;
  description: string;
  code: string;
}

const DocBox: React.FC<DocBoxProps> = props => {
  const { title, description, code, children } = props;

  const [showCode, setShowCode] = useState(false);

  const BoxDemo = <section className="doc-box-demo">{children}</section>;

  const BoxMeta = (
    <section className="doc-box-meta">
      <div className="doc-box-title">
        <span className="title-text">{title}</span>
        <span className="title-icon">
          <IconEdit />
        </span>
      </div>
      <div className="doc-box-description">{description}</div>
      <div className="doc-box-actions">
        <span className="actions-icon">
          <IconCopy />
        </span>
        <span className="actions-icon" onClick={() => setShowCode(!showCode)}>
          <IconCode />
        </span>
      </div>
    </section>
  );

  const HighlightWrapper = (
    <section className={classnames('highlight-wrapper', showCode && 'highlight-wrapper-expand')}>
      <Highlight>{code}</Highlight>
    </section>
  );

  return (
    <section className={classnames('doc-box', showCode && 'expand')}>
      {BoxDemo}
      {BoxMeta}
      {HighlightWrapper}
    </section>
  );
};

export default DocBox;
