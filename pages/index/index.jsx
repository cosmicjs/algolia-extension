import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

import IndicesTab from '../../tabs/Indices';
import KeysTab from '../../tabs/Keys';
import PreviewTab from '../../tabs/Preview';
import LoadingOverlay from '../../components/LoadingOverlay';
import Tabs from '../../components/Tabs';
import { fetchSettings } from '../../state/settings/actions';
import withRoot from '../../components/withRoot';
import styles from './styles';

const getTab = (tabValue) => {
  switch (tabValue) {
    case 0:
      return <KeysTab />;
    case 1:
      return <IndicesTab />;
    case 2:
    case 3:
      return <PreviewTab />;
    default:
      return <KeysTab />;
  }
};

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchSettings());
  }

  handleTabChange(tabValue) {
    this.setState({ tabValue });
  }

  render() {
    const { classes, isLoading } = this.props;
    const { tabValue } = this.state;

    return (
      <Container className={classes.root}>
        <Row>
          <Col xs={{ size: 12 }}>
            <h1 className={classes.h1}>
              Algolia Search
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: 12 }}>
            <Tabs onTabChange={this.handleTabChange} />
          </Col>
        </Row>
        {getTab(tabValue)}
        <LoadingOverlay visible={isLoading} />
      </Container>
    );
  }
}

IndexPage.defaultProps = {
  isLoading: false,
};

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {
    indices,
    objectTypes,
    settings,
  } = state;
  const isLoading = indices.isLoading || objectTypes.isLoading
    || settings.isLoading;

  return { isLoading };
};

export default compose(
  withRoot,
  withStyles(styles),
  connect(mapStateToProps),
)(IndexPage);
