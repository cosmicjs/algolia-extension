export default theme => ({
  footer: {
    marginBottom: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  root: {
    marginTop: theme.spacing.unit * 2,
  },
  '@global': {
    '.ais-Hits': {

    },
    '.ais-Hits-list': {
      display: 'block',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '.ais-Hits-item': {
      display: 'block',
      padding: 0,
      margin: 0,
    },
    '.ais-Pagination': {

    },
    '.ais-Pagination--noRefinement': {

    },
    '.ais-Pagination-list': {
      display: 'inline-block',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '.ais-Pagination-list--noRefinement': {

    },
    '.ais-Pagination-item': {
      backgroundColor: '#F1F1F1',
      borderColor: '#BDBDBD',
      borderStyle: 'solid',
      borderWidth: 1,
      display: 'block',
      float: 'left',
      margin: 2,
      padding: 0,
      '&:hover': {
        backgroundColor: '#E0E0E0',
      },
    },
    '.ais-Pagination-item--firstPage': {

    },
    '.ais-Pagination-item--lastPage': {

    },
    '.ais-Pagination-item--previousPage': {

    },
    '.ais-Pagination-item--nextPage': {

    },
    '.ais-Pagination-item--page': {

    },
    '.ais-Pagination-item--selected': {
      borderColor: '#2196F3',
    },
    '.ais-Pagination-item--disabled': {

    },
    '.ais-Pagination-link': {
      color: '#111',
      display: 'block',
      margin: 0,
      padding: '4px 8px',
      textDecoration: 'none',
    },
  },
});
