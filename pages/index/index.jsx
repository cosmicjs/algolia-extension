import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

import withRoot from '../../components/withRoot';
import styles from './styles';

class IndexPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.root}>
        <Row>
          <Col>
            Index Page
          </Col>
        </Row>
      </Container>
    );
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
  connect(),
)(IndexPage);
