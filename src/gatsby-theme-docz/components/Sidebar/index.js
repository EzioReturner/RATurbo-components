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

  const { indexMenus, componentMenus, layoutMenus, docsMenus } = menus

  const renderMenu = menus => {
    return menus && menus.map(menu => {
      if (menu.fullpage) return null;
      if (!menu.route) return <NavGroup key={menu.id} item={menu} sidebarRef={ref} />;
      if (menu.route === currentDoc.route) {
        return (
          <NavLink key={menu.id} item={menu} ref={currentDocRef} />
        );
      }
      return (
        <NavLink key={menu.id} item={menu} />
      );
    })
  }

  return (
    <>
      <Box onClick={props.onClick} sx={styles.overlay(props)}>
        {props.open && <Global styles={styles.global} />}
      </Box>
      <Box ref={ref} sx={styles.wrapper(props)} data-testid="sidebar">
        {
          ['components', 'layout', 'index'].includes(currentDoc.menu) &&
          <>
            <div className="sidebar-title">
            {renderMenu(indexMenus?.menu)}
            </div>
            <div className="sub-title">业务</div>
            <div className="sidebar-divide"></div>
            {renderMenu(componentMenus?.menu)}
            <div className="sub-title">布局</div>
            <div className="sidebar-divide"></div>
            {renderMenu(layoutMenus?.menu)}
          </>
        }
        {
          currentDoc.menu === 'docs' && 
          <div>
            {renderMenu(docsMenus?.menu.sort((a,b)=>(a.index-b.index)))}
          </div>
        }
        {
          currentDoc.menu === 'logs' && 
          <div>
            {renderMenu(logsMenus?.menu)}
          </div>
        }
      </Box>
    </>
  );
});
