import React from 'react';
import { theme, useConfig, ComponentsProvider } from 'docz'; 
import { ThemeProvider } from 'theme-ui';
import baseComponents from 'gatsby-theme-docz/src/components';
import baseTheme from 'gatsby-theme-docz/src/theme';
import { H1, H2, H3, H4, H5, H6, P } from './markdown-ui/Tag';

const componentsMap = {
  ...baseComponents,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P
}

const Theme = ({ children }) => {
  const config = useConfig();
  return (
    <ThemeProvider theme={config.themeConfig}>
      <ComponentsProvider components={componentsMap}>
        {children}
      </ComponentsProvider>
    </ThemeProvider>
  )
}

export default theme(baseTheme)(Theme);