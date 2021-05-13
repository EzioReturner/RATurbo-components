import React from 'react';
import { useConfig, useCurrentDoc } from 'docz';
// import { NavSearch } from 'gatsby-theme-docz/src/components/NavSearch';
import NavSearch from './NavSearch';
import { NavLink } from '../NavLink';
import './index.less';

const Header = props => {
  const { title } = useConfig();
  const current = useCurrentDoc();

  const { setQuery, query, menus } = props;

  const docMenu = menus.docsMenus?.menu[0];

  const compMenu = menus.componentMenus?.menu[0];

  const logMenu = menus.logsMenus?.menu[0];

  const isActive = (menu) => {
    return menu.includes(current.menu) ? { className: "active" } : {}
  }

  return <header className="tc-doc-header">
    <div className="header-flow">
      <h1>
        <a className="logo">{title}</a>
      </h1>
      <NavSearch />
      <div className="header-link-group">
        <p className="header-link">
          <NavLink key={docMenu.id} item={docMenu} getProps={()=>isActive(['docs'])}>
            文档
          </NavLink>
        </p>
        <p className="header-link">
          <NavLink key={compMenu.id} item={compMenu}  getProps={()=>isActive(['components', 'index', 'layout'])}>
            组件
          </NavLink>
        </p>
        <p className="header-link">
          <NavLink key={logMenu.id} item={logMenu}   getProps={()=>isActive(['logs'])}>
            更新日志
          </NavLink>
        </p>
      </div>
      {/* <NavSearch sx={styles.navSearch} placeholder="Type to search..." value={query} onChange={handleChange} /> */}
    </div>
  </header>
}

export default Header;