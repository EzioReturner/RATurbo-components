import { media } from 'gatsby-theme-docz/src/theme/breakpoints';

export const main = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: 0
};

export const wrapper = {
  py: 0,
  flex: 1,
  paddingTop: '40px',
  display: 'grid',
  gridTemplateColumns: '250px minmax(0, 1fr)',
  minHeight: '100vh',
  [media.tablet]: {
    display: 'block',
  },
};

export const container = {
  margin: 0,
  padding: '0 64px 32px 64px'
}
