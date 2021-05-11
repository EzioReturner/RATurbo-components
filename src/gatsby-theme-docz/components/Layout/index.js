/** @jsx jsx */
import { useRef, useState } from 'react';
import { useCurrentDoc, useMenus } from 'docz';
import { jsx, Layout as BaseLayout, Main } from 'theme-ui';
import { Global } from '@emotion/core';

import global from 'gatsby-theme-docz/src/theme/global';
import { MainContainer } from 'gatsby-theme-docz/src/components/MainContainer';
import Header from '../Header';
import { Sidebar } from '../Sidebar';
import * as styles from './styles';
import Users from 'react-feather/dist/icons/users'

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const nav = useRef();
  const current = useCurrentDoc();

  const [query, setQuery] = useState('');

  const menus = useMenus({ query });

  if (current.fullpage) return children;

  const Wrapper = <div>
    {current.title && <div>
      <h1 className="markdown-h1">{current.title}</h1>
      <blockquote sx={styles.blockquote}>
        <p>贡献者：</p>
        <Users />
        <p>{current.contributors}</p>
      </blockquote>
    </div>}
    {children}
  </div>

  return (
    <BaseLayout sx={{ '& > div': { flex: '1 1 auto' } }} data-testid="layout">
      <Global styles={global} />
      <Main sx={styles.main}>
        <Header setQuery={setQuery} query={query} />
        <div sx={styles.wrapper}>
          <Sidebar
            menus={menus}
            ref={nav}
            open={open}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(false)}
          />
          <MainContainer data-testid="main-container" sx={styles.container}>{Wrapper}</MainContainer>
        </div>
      </Main>
    </BaseLayout>
  );
};
