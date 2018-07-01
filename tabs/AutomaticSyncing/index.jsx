import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import { addWebhooks, removeWebhooks } from '../../state/settings/actions';
import styles from './styles';

class AutomaticSyncingTab extends Component {
  constructor(props) {
    super(props);

    this.handleDisableSyncingClick = this.handleDisableSyncingClick.bind(this);
    this.handleEnableSyncingClick = this.handleEnableSyncingClick.bind(this);
  }

  handleDisableSyncingClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(removeWebhooks());
  }

  handleEnableSyncingClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(addWebhooks());
  }

  render() {
    const { classes, webhooksAdded } = this.props;

    return (
      <Fragment>
        <Row className={classes.descriptionRow}>
          <Col
            xs={{ offset: 0, size: 12 }}
            md={{ offset: 1, size: 10 }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
        </Row>
        <Row className={classes.buttonRow}>
          <Col>
            {
              !webhooksAdded &&
              <Button
                color="primary"
                onClick={this.handleEnableSyncingClick}
                variant="raised"
              >
                Enable Automatic Syncing
              </Button>
            }
            {
              webhooksAdded &&
              <Fragment>
                <p>
                  You have already enabled automatic syncing.
                </p>
                <Button
                  onClick={this.handleDisableSyncingClick}
                  variant="raised"
                >
                  Disable Automatic Syncing
                </Button>
              </Fragment>
            }
          </Col>
        </Row>
      </Fragment>
    );
  }
}

AutomaticSyncingTab.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  webhooksAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  webhooksAdded: Boolean(state.settings && state.settings.data
    && state.settings.data.webhooks
    && !!Object.keys(state.settings.data.webhooks).length),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(AutomaticSyncingTab);
