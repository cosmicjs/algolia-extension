import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InstantSearch } from 'react-instantsearch/dom';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

import Header from './Header';
import Results from './Results';
import Sidebar from './Sidebar';

const Preview = ({
  apiKey,
  appId,
  index,
}) => {
  if (!apiKey || !appId || !index) return null;

  return (
    <InstantSearch
      apiKey={apiKey}
      appId={appId}
      indexName={index}
    >
      <Container>
        <Header />
        <Row>
          <Sidebar index={index} />
          <Results />
        </Row>
      </Container>
    </InstantSearch>
  );
};

Preview.defaultProps = {
  apiKey: undefined,
  appId: undefined,
};

Preview.propTypes = {
  apiKey: PropTypes.string,
  appId: PropTypes.string,
  index: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  apiKey: state.settings && state.settings.data && state.settings.data.adminApiKey,
  appId: state.settings && state.settings.data && state.settings.data.applicationId,
});

export default connect(mapStateToProps)(Preview);
