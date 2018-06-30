import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Row from 'reactstrap/lib/Row';
import Switch from '@material-ui/core/Switch';

import styles from './styles';

import {
  addFacetAttribute,
  addSearchableAttribute,
  removeFacetAttribute,
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
    const { checked } = event.target;
    const { cosmicKey, dispatch, slug } = this.props;

    if (checked) {
      dispatch(addFacetAttribute(slug, cosmicKey));
    } else {
      dispatch(removeFacetAttribute(slug, cosmicKey));
    }
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
      classes,
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
          <Col className={classes.col}>
            {title}
          </Col>
          <Col className={classes.col} xs={{ position: 12 }}>
            <FormControlLabel
              clases={{ root: classes.formControlLabel }}
              control={
                <Switch
                  classes={{ root: classes.toggle }}
                  color="primary"
                  onChange={this.handleSearchableToggle}
                  checked={isSearchable}
                />
              }
              label="Searchable"
            />
            <FormControlLabel
              clases={{ root: classes.formControlLabel }}
              control={
                <Switch
                  classes={{ root: classes.toggle }}
                  color="primary"
                  onChange={this.handleFacetToggle}
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
  classes: PropTypes.object.isRequired,
  cosmicKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  indices: PropTypes.object,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  indices: state.indices && state.indices.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Metafield);
