import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import MaterialTabs from '@material-ui/core/Tabs';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.setState({ value });
    this.props.onTabChange(value);
  }

  render() {
    const { algoliaIsConnected } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <MaterialTabs
          indicatorColor="primary"
          onChange={this.handleTabChange}
          textColor="primary"
          value={value}
        >
          <Tab label="Keys" />
          <Tab label="Indices" disabled={!algoliaIsConnected} />
          <Tab label="Sync" disabled={!algoliaIsConnected} />
          <Tab label="Preview" disabled={!algoliaIsConnected} />
        </MaterialTabs>
        <Divider light />
      </Fragment>
    );
  }
}

Tabs.defaultProps = {
  algoliaIsConnected: false,
};

Tabs.propTypes = {
  algoliaIsConnected: PropTypes.bool,
  onTabChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const algoliaIsConnected = state.indices && state.indices.data
    && !state.indices.error;

  return {
    algoliaIsConnected,
  };
};

export default connect(mapStateToProps)(Tabs);
