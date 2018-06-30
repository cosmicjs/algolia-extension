import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Hits, Pagination } from 'react-instantsearch/dom';
import Col from 'reactstrap/lib/Col';

import Entry from '../Entry';
import styles from './styles';

const Results = ({ classes }) => (
  <Col className={classes.root}>
    <Hits hitComponent={Entry} />
    <div className={classes.footer}>
      <Pagination />
    </div>
  </Col>
);

Results.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Results);
