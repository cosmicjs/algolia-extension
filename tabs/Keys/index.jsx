import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';

import { setSettings } from '../../state/settings/actions';
import styles from './styles';

class KeysTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminApiKeyInput: props.adminApiKey,
      applicationIdInput: props.applicationId,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const updates = {};

    if (!this.props.adminApiKey && nextProps.adminApiKey) {
      updates.adminApiKeyInput = nextProps.adminApiKey;
    }
    if (!this.props.applicationId && nextProps.applicationId) {
      updates.applicationIdInput = nextProps.applicationId;
    }

    if (Object.keys(updates).length) {
      this.setState(updates);
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { applicationIdInput, adminApiKeyInput } = this.state;

    this.props.dispatch(setSettings({
      adminApiKey: adminApiKeyInput,
      applicationId: applicationIdInput,
    }));
  }

  render() {
    const { classes } = this.props;
    const { adminApiKeyInput, applicationIdInput } = this.state;

    return (
      <Row className={classes.root}>
        <Col>
          <Form>
            <FormGroup>
              <Label for="application-id">Application ID</Label>
              <Input
                id="application-id"
                name="applicationIdInput"
                onChange={this.handleInputChange}
                placeholder="Algolia Application ID"
                type="text"
                value={applicationIdInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="admin-api-key">Admin API Key</Label>
              <Input
                id="admin-api-key"
                name="adminApiKeyInput"
                onChange={this.handleInputChange}
                placeholder="Algolia Admin API Key"
                type="password"
                value={adminApiKeyInput}
              />
            </FormGroup>
            <Button
              className={classes.button}
              color="primary"
              onClick={this.handleSubmit}
              variant="raised"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

KeysTab.defaultProps = {
  adminApiKey: '',
  applicationId: '',
};

KeysTab.propTypes = {
  adminApiKey: PropTypes.string,
  applicationId: PropTypes.string,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  adminApiKey: state.settings && state.settings.data
    && state.settings.data.adminApiKey,
  applicationId: state.settings && state.settings.data
    && state.settings.data.applicationId,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(KeysTab);
