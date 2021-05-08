import React from 'react';
import { useConfig } from 'docz';
// import { NavSearch } from 'gatsby-theme-docz/src/components/NavSearch';
import NavSearch from './NavSearch';
import './index.less';

const Header = props => {
  const { title } = useConfig();

  const { setQuery, query } = props;

  const handleChange = ev => {
    setQuery(ev.target.value);
  };

  return <header className="tc-header">
    <div className="header-flow">
      <h1>
        <a className="logo">{title}</a>
      </h1>
      <NavSearch/>
      {/* <NavSearch sx={styles.navSearch} placeholder="Type to search..." value={query} onChange={handleChange} /> */}
    </div>
  </header>
}

export default Header;