export default theme => ({
  menuButton: {
    display: 'inline-block',
  },
  menuIcon: {
    fill: theme.palette.grey[600],
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    display: 'flex',
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    zIndex: 20,
  },
  '@global': {
    '.ais-SearchBox': {
      margin: '0 auto',
      maxWidth: theme.breakpoints.values.sm,
      width: '100%',
    },
    '.ais-SearchBox-form': {
      display: 'inline-flex',
      width: '100%',
    },
    '.ais-SearchBox-input': {
      borderColor: theme.palette.grey[300],
      borderRadius: 4,
      borderStyle: 'solid',
      borderWidth: 1,
      display: 'inline-block',
      flex: 1,
      height: 'auto',
      overflow: 'hidden',
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
    },
    '.ais-SearchBox-input:focus': {
      borderColor: '#42A5F5',
    },
    '.ais-SearchBox-submit': {
      display: 'none',
    },
    '.ais-SearchBox-submit:hover': {

    },
    '.ais-SearchBox-submitIcon': {

    },
    '.ais-SearchBox-reset': {
      display: 'none',
    },
    '.ais-SearchBox-resetIcon': {

    },
    '.ais-SearchBox-loadingIndicator': {

    },
    '.ais-SearchBox-loadingIcon': {

    },
  },
});
