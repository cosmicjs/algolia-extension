import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Col from 'reactstrap/lib/Col';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'reactstrap/lib/Row';
import Select from '@material-ui/core/Select';

import Preview from '../../components/Preview';
import styles from './styles';

class PreviewTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: Object.keys(props.indices)[0] || '',
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    const currentIndex = event.target.value;
    this.setState({ currentIndex });
  }

  render() {
    const { classes, indices } = this.props;
    const { currentIndex } = this.state;

    return (
      <Fragment>
        <Row className={classes.root}>
          <Col className={classes.headerCol} xs={{ size: 12 }}>
            <label className={classes.label} htmlFor="index-select">
              Index:&nbsp;
            </label>
            <Select
              classes={{ root: classes.select }}
              id="index-select"
              onChange={this.handleSelectChange}
              value={currentIndex}
            >
              {
                indices && Object.keys(indices).map(key => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))
              }
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Preview index={currentIndex} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

PreviewTab.defaultProps = {
  indices: {},
};

PreviewTab.propTypes = {
  classes: PropTypes.object.isRequired,
  indices: PropTypes.object,
};

const mapStateToProps = state => ({
  indices: state.indices && state.indices.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(PreviewTab);
