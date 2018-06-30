export default theme => ({
  defaultText: {
    color: theme.palette.text.secondary,
    display: 'block',
    marginBottom: 4,
  },
  infoContainer: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
  root: {
    borderColor: theme.palette.grey[200],
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    display: 'block',
    fontSize: '1.1rem',
    marginBottom: 4,
  },
});
