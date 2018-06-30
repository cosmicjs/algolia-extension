import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ObjectType from '../../components/ObjectType';
import { fetchObjectTypesIfNeeded } from '../../state/objectTypes/actions';

class IndicesTab extends Component {
  componentDidMount() {
    this.props.dispatch(fetchObjectTypesIfNeeded());
  }

  render() {
    const { objectTypes } = this.props;

    return (
      <Fragment>
        {
          objectTypes && objectTypes.map(objectType => (
            <ObjectType
              key={objectType.slug}
              {...objectType}
            />
          ))
        }
      </Fragment>
    );
  }
}

IndicesTab.defaultProps = {
  objectTypes: [],
};

IndicesTab.propTypes = {
  dispatch: PropTypes.func.isRequired,
  objectTypes: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = state => ({
  objectTypes: state.objectTypes && state.objectTypes.data,
});

export default connect(mapStateToProps)(IndicesTab);
