import React from 'react';
import './tag.less';

const H1 = props => <h1 className="markdown-h1">{props.children}</h1>;
const H2 = props => <h2 className="markdown-h2">{props.children}</h2>;
const H3 = props => <h3 className="markdown-h3">{props.children}</h3>;
const H4 = props => <h4 className="markdown-h4">{props.children}</h4>;
const H5 = props => <h5 className="markdown-h5">{props.children}</h5>;
const H6 = props => <h6 className="markdown-h6">{props.children}</h6>;
const P = props => <p className="markdown-p">{props.children}</p>;

export { H1, H2, H3, H4, H5, H6, P };