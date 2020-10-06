import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import queryString from 'query-string';

import {
  addWebhooks,
  removeWebhooks,
  setSettings,
} from '../../state/settings/actions';
import styles from './styles';

class AutomaticSyncingTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bucketIdInput: props.bucketId,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDisableSyncingClick = this.handleDisableSyncingClick.bind(this);
    this.handleEnableSyncingClick = this.handleEnableSyncingClick.bind(this);
  }

  handleChange(event) {
    const bucketIdInput = event.target.value;
    this.setState({ bucketIdInput });
  }

  handleDisableSyncingClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(removeWebhooks());
  }

  async handleEnableSyncingClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    await dispatch(setSettings({ bucketId: this.state.bucketIdInput }));
    dispatch(addWebhooks());
  }

  render() {
    const { classes, webhooksAdded } = this.props;
    const { bucketIdInput } = this.state;

    const bucketSlug = typeof window !== 'undefined'
      && queryString.parse(window.location.search).bucket_slug;

    return (
      <Fragment>
        <Row className={classes.descriptionRow}>
          <Col
            xs={{ offset: 0, size: 12 }}
            md={{ offset: 1, size: 10 }}
          >
            <p>
              Enter your Cosmic&nbsp;
              {
                bucketSlug
                  ? (
                    <a
                      href={`https://app.cosmicjs.com/${bucketSlug}/settings/main`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Bucket ID
                    </a>
                  )
                  : 'Bucket ID'
              }
              &nbsp;below and click &apos;Enable Automatic
              Syncing&apos; below to update Algolia whenever you add or edit a
              Cosmic Object.
            </p>
          </Col>
        </Row>
        <Row className={classes.inputRow}>
          <Col xs={{ size: 'auto' }}>
            <Label className={classes.label} for="bucket-id">Bucket ID</Label>
          </Col>
          <Col>
            <Input
              id="bucket-id"
              name="bucketId"
              onChange={this.handleChange}
              placeholder="Cosmic Bucket ID"
              type="text"
              value={bucketIdInput}
            />
          </Col>
        </Row>
        {
          webhooksAdded &&
          <Row>
            <Col>
              <p className={classes.p}>
                You have already enabled automatic syncing.
              </p>
            </Col>
          </Row>
        }
        {
          webhooksAdded &&
          <Row className={classes.buttonRow}>
            <Col>
              <Button
                className={classes.button}
                onClick={this.handleDisableSyncingClick}
                variant="raised"
              >
                Disable Automatic Syncing
              </Button>
            </Col>
          </Row>
        }
        {
          !webhooksAdded &&
          <Row className={classes.buttonRow}>
            <Col>
              <Button
                className={classes.button}
                color="primary"
                onClick={this.handleEnableSyncingClick}
                variant="raised"
              >
                Enable Automatic Syncing
              </Button>
            </Col>
          </Row>
        }
      </Fragment>
    );
  }
}

AutomaticSyncingTab.defaultProps = {
  bucketId: '',
};

AutomaticSyncingTab.propTypes = {
  bucketId: PropTypes.string,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  webhooksAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  bucketId: state.settings && state.settings.data
    && state.settings.data.bucketId,
  webhooksAdded: Boolean(state.settings && state.settings.data
    && state.settings.data.webhooks
    && !!Object.keys(state.settings.data.webhooks).length),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(AutomaticSyncingTab);
