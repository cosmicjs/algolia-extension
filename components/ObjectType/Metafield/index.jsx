import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

const Metafield = ({ title }) => (
  <Container>
    <Row>
      <Col>
        {title}
      </Col>
    </Row>
  </Container>
);

Metafield.propTypes = {
  title: PropTypes.string.isRequired,
};

export default connect()(Metafield);
