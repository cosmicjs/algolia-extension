import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { ClearRefinements, RefinementList } from 'react-instantsearch/dom';
import Col from 'reactstrap/lib/Col';

import Divider from '@material-ui/core/Divider';
import styles from './styles';

const Sidebar = ({
  classes,
  index,
  indices,
}) => {
  const facets = (indices[index] && indices[index].attributesForFaceting) || [];

  if (!facets.length) {
    return null;
  }

  return (
    <Col
      className={classes.root}
      xs={{ size: 12 }}
      md={{ size: 4 }}
      lg={{ size: 3 }}
    >
      <ClearRefinements />
      <Divider className={classes.divider} light />
      {
        facets.map(facet => (
          <div className={classes.refinementList} key={facet}>
            <div className={classes.title}>
              {facet}
            </div>
            <RefinementList attribute={facet} />
          </div>
        ))
      }
    </Col>
  );
};

Sidebar.defaultProps = {
  indices: {},
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  indices: PropTypes.object,
};

const mapStateToProps = state => ({
  indices: state.indices && state.indices.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Sidebar);
