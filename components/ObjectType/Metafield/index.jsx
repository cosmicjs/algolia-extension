import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Row from 'reactstrap/lib/Row';
import Switch from '@material-ui/core/Switch';

import {
  addSearchableAttribute,
  removeSearchableAttribute,
} from '../../../state/indices/actions';

class Metafield extends Component {
  constructor(props) {
    super(props);

    this.handleFacetToggle = this.handleFacetToggle.bind(this);
    this.handleSearchableToggle = this.handleSearchableToggle.bind(this);
  }

  handleFacetToggle(event) {
    event.preventDefault();
  }

  handleSearchableToggle(event) {
    event.preventDefault();
    const { checked } = event.target;
    const { cosmicKey, dispatch, slug } = this.props;

    if (checked) {
      dispatch(addSearchableAttribute(slug, cosmicKey));
    } else {
      dispatch(removeSearchableAttribute(slug, cosmicKey));
    }
  }

  render() {
    const {
      cosmicKey,
      indices,
      slug,
      title,
    } = this.props;

    const isSearchable = !!(indices[slug] && indices[slug].attributesToIndex
      && indices[slug].attributesToIndex.includes(cosmicKey));

    const isFacet = !!(indices[slug] && indices[slug].attributesForFaceting
      && indices[slug].attributesForFaceting.includes(cosmicKey));

    return (
      <Container>
        <Row>
          <Col>
            {title}
          </Col>
          <Col>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  onChange={this.handleSearchableToggle}
                  checked={isSearchable}
                />
              }
              label="Searchable"
            />
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  onChange={this.handleSearchableToggle}
                  checked={isFacet}
                />
              }
              label="Facet"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

Metafield.defaultProps = {
  indices: {},
};

Metafield.propTypes = {
  cosmicKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  indices: PropTypes.object,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  indices: state.indices && state.indices.data,
});

export default connect(mapStateToProps)(Metafield);
