import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import styles from './styles';

class AutomaticSyncingTab extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Row className={classes.root}>
        <Col>
          Automatic Syncing
        </Col>
      </Row>
    );
  }
}

AutomaticSyncingTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(AutomaticSyncingTab);
