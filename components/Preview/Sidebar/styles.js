export default theme => ({
  directions: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 2,
    color: theme.palette.text.secondary,
    display: 'block',
    fontSize: '0.9rem',
    marginBottom: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 1,
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'end',
    marginBottom: theme.spacing.unit * 2,
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    marginTop: -theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    textAlign: 'right',
    '&:focus': {
      outline: 'none',
    },
  },
  refinementList: {
    marginBottom: theme.spacing.unit * 2,
  },
  root: {
    marginTop: theme.spacing.unit * 2,
    zIndex: 0,
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '0.8rem',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  '@global': {
    '.ais-ClearRefinements': {
      marginBottom: theme.spacing.unit * 2,
    },
    '.ais-ClearRefinements-button': {
      backgroundColor: theme.palette.grey[200],
      borderRadius: 4,
      borderStyle: 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      cursor: 'pointer',
      display: 'inline-block',
      marginRight: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit,
      transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
      '&:hover': {
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      },
    },
    '.ais-ClearRefinements-button--disabled': {
      boxShadow: 'none',
      cursor: 'auto',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.ais-RefinementList': {

    },
    '.ais-RefinementList--noRefinement': {

    },
    '.ais-RefinementList-searchBox': {

    },
    '.ais-RefinementList-list': {
      display: 'block',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '.ais-RefinementList-item': {
      color: '#000',
      marginBottom: -1,
      borderRadius: theme.spacing.unit / 2,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 1,
      fontSize: '0.8rem',
      padding: theme.spacing.unit,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
      },
    },
    '.ais-RefinementList-item--selected': {
      borderColor: theme.palette.primary.main,
      '&>.ais-RefinementList-label>.ais-RefinementList-count': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '.ais-RefinementList-label': {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      margin: 0,
      padding: 0,
    },
    '.ais-RefinementList-checkbox': {
      display: 'none',
    },
    '.ais-RefinementList-labelText': {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.ais-RefinementList-count': {
      backgroundColor: '#9E9E9E',
      borderRadius: 24,
      color: '#fff',
      marginLeft: 8,
      minWidth: theme.spacing.unit * 4,
      padding: '3px 8px',
      textAlign: 'center',
    },
    '.ais-RefinementList-noResults': {

    },
    '.ais-RefinementList-showMore': {

    },
    '.ais-RefinementList-showMore--disabled': {

    },
  },
});
