import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SearchBox } from 'react-instantsearch/dom';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import styles from './styles';

const Header = ({ classes }) => (
  <Row className={classes.root} noGutters>
    <Col>
      <SearchBox />
    </Col>
  </Row>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
