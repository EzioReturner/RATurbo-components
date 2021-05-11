const styles = {
  Container: {
    p: 4,
    maxWidth: 1280,
  },
  root: {
    fontSize: 3,
    color: 'rgba(0,0,0,0.85)',
    bg: 'background',
    fontFamily: 'ui',
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    '&:hover': {
      color: 'secondary',
      textDecoration: 'underline',
    },
  },
  h1: {
    fontSize: 6,
    fontFamily: 'display',
  },
  h2: {
    fontSize: 5,
    fontFamily: 'display',
  },
  h3: {
    fontSize: 4,
  },
  h4: {
    fontSize: 3,
  },
  h5: {
    fontSize: 2,
  },
  h6: {
    fontSize: 1,
  },
  ul: {
    listStyleType: 'circle'
  },
  li: {
    fontSize: '14px',
    marginBottom: 0,
    '> p': {
      margin: '0.2em 0'
    }
  },
  blockquote: {
    my: '12px',
    mx: 0,
    paddingLeft: '10px',
    borderLeft: t => `4px solid #f0f0f0`,
    color: 'blockquote.color',
    '> p': {
      lineHeight: 2,
      m: 0,
      fontSize: '12px',
      color: 'rgba(0,0,0,.45)'
    },
  },
  code: {
    fontFamily: 'monospace',
  },
  inlineCode: {
    fontFamily: 'monospace',
    color: 'primary',
    bg: 'grayExtraLight',
    borderRadius: 'radius',
    px: 1,
    mx: 1,
  },
  pre: {
    my: 3,
    p: 3,
    variant: 'prism',
    textAlign: 'left',
    fontFamily: 'monospace',
    borderRadius: 'radius',
  },
  table: {
    color: 'rgba(0,0,0,0.85)',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    margin: '2em 0',
    fontSize: '13px',
    direction: 'ltr',
    emptyCells: 'show',
    lineHeight: 1.5715,
    fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace',
    [['th', 'td']]: {
      textAlign: 'left',
      borderColor: '#f0f0f0',
      border: '1px solid #f0f0f0',
      padding: '12px',
      borderWidth: '1px 0'
    },
    th: {
      borderWidth: '1px 0 2px',
      paddingTop: '14px',
      color: '#5c6b77',
      fontWeight: 500,
      background: 'rgba(0,0,0,.02)',
      ':first-child': {
        paddingLeft: '12px',
        borderLeft: '1px solid #f0f0f0'
      },
      ':last-child': {
        borderRight: '1px solid #f0f0f0'
      }
    },
    td: {
      fontSize: '13px',
      ':first-child': {
        color: '#595959',
        fontWeight: 600,
        paddingLeft: '12px',
        borderLeft: '1px solid #f0f0f0'
      },
      ':nth-child(3)': {
        color: '#c41d7f'
      },
      ':last-child': {
        borderRight: '1px solid #f0f0f0'
      }
    }
  },
  th: {
  },
  td: {
  },
  hr: {
    border: 0,
    borderBottom: t => `1px solid ${t.colors.border}`,
  }
};

export default styles;
