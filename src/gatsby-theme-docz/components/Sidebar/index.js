/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React, { useRef, useEffect } from 'react';
import { Global } from '@emotion/core';
import { jsx, Box } from 'theme-ui';
import { useCurrentDoc } from 'docz';

import * as styles from './styles';
import { NavGroup } from 'gatsby-theme-docz/src/components/NavGroup';
import { NavLink } from '../NavLink';
import './index.less';

export const Sidebar = React.forwardRef((props, ref) => {
  const currentDoc = useCurrentDoc();
  const currentDocRef = useRef();

  const { menus } = props;
 
  useEffect(() => {
    if (ref.current && currentDocRef.current) {
      ref.current.scrollTo(0, currentDocRef.current.offsetTop);
    }
  }, []);

  const infoMenus = menus.slice(0, menus.length - 1).sort((a,b)=>a.index-b.index);
  const componentMenus = menus[menus.length - 1];

  const LAYOUT_GROUP = ['Layout', 'Header', 'Sider'];

  const { operation, layout } = componentMenus.menu.reduce((total, component) => {
    if (LAYOUT_GROUP.includes(component.name)) {
      component.name ==='Layout' && total.layout.push(component)
    } else {
      total.operation.push(component)
    }
    return total;
  }, {
      operation: [],
      layout: []
  });

  const renderMenu = menus => {
    return menus && menus.map(menu => {
      if (menu.fullpage) return null;
      if (!menu.route) return <NavGroup key={menu.id} item={menu} sidebarRef={ref} />;
      if (menu.route === currentDoc.route) {
        return (
          <NavLink key={menu.id} item={menu} ref={currentDocRef}>
            {menu.name}
          </NavLink>
        );
      }
      return (
        <NavLink key={menu.id} item={menu}>
          {menu.name}
        </NavLink>
      );
    })
  }

  return (
    <>
      <Box onClick={props.onClick} sx={styles.overlay(props)}>
        {props.open && <Global styles={styles.global} />}
      </Box>
      <Box ref={ref} sx={styles.wrapper(props)} data-testid="sidebar">
        <div className="sidebar-title">
          {renderMenu(infoMenus)}
        </div>
        <div className="sub-title">业务</div>
        <div className="sidebar-divide"></div>
        {renderMenu(operation)}
        <div className="sub-title">布局</div>
        <div className="sidebar-divide"></div>
        {renderMenu(layout)}
      </Box>
    </>
  );
});
