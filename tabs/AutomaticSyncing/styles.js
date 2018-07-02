export default theme => ({
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonRow: {
    marginBottom: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  descriptionRow: {
    marginTop: theme.spacing.unit * 4,
  },
  inputRow: {
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
  },
  label: {
    display: 'block',
    margin: 0,
    padding: 0,
  },
  p: {
    color: theme.palette.grey[500],
    marginBottom: 0,
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});
