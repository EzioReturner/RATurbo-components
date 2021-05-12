const after = {
  content: '""',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  borderRight: '3px solid #1890ff',
  transform: 'scaleY(.0001)',
  opacity: 0,
  transition: 'transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1),-webkit-transform .15s cubic-bezier(.215,.61,.355,1)'
}

export const link = {
  my: 2,
  display: 'block',
  color: 'sidebar.navGroup',
  textDecoration: 'none',
  fontSize: 2,
  position: 'relative',
  transition: 'color 0.3s',
  '&:hover': {
    color: '#1890ff',
  },
  '&.active': {
    color: '#1890ff',
    backgroundColor: '#e6f7ff'
  },
  '&::after': {
    ...after,
  },
  '&.active::after': {
    ...after,
    transform: 'scaleY(1)',
    opacity: 1,
    transition: 'transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1),-webkit-transform .15s cubic-bezier(.645,.045,.355,1)'
  },
  paddingLeft: '40px',
  height: '40px',
  lineHeight: '40px',
  marginTop: '4px',
  color: 'rgba(0,0,0,0.85)',
  fontSize: '14px',
  '&>.chinese': {
    marginLeft: '6px',
    fontSize: '12px',
    opacity: '0.67'
  }
}

export const smallLink = {
  ...link,
  ml: 3,
  fontSize: 1,
  position: 'relative',
  color: 'sidebar.tocLink',
  '&.active': {
    color: 'sidebar.tocLinkActive',
  },
  '&.active::before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    top: '2px',
    left: -2,
    height: '1rem',
    backgroundColor: 'primary',
    transition: 'width 200ms ease 0s',
    width: '2px',
    borderRadius: 1,
  },
}
