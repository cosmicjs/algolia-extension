import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import styles from './styles';

const HelpTab = ({ classes }) => (
  <Row className={classes.descriptionRow}>
    <Col
      xs={{ offset: 0, size: 12 }}
      md={{ offset: 1, size: 10 }}
    >
      <p className={classes.p}>
        To get started you must sign up for an&nbsp;
        <a
          href="https://www.algolia.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Algolia
        </a>
        &nbsp;account and create an App. For this extension to work,
        you will need your&nbsp;
        <em>Application ID</em>
        &nbsp;and&nbsp;
        <em>Admin API Key</em>. These can be found under the &apos;Keys&apos; tab of
        the Algolia App Dashboard. Once you&apos;ve retrieved your id and key,
        navigate to the &apos;Keys&apos; tab here and add them.
      </p>
      <p className={classes.p}>
        If the connection to Algolia is successful, the &apos;Indices&apos;,
        &apos;Automatic Syncing&apos;, and &apos;Preview&apos; tabs should become enabled. The
        &apos;Indices&apos; tab allows you to sync your Cosmic JS Objects with Algolia
        and change your index settings. The &apos;Automatic Syncing&apos; tab allows
        you to sign up for automatic syncing. This keeps your Algolia index
        up to date whenever you add or edit a Cosmic JS Object. The
        &apos;Preview&apos; tab allows you to test your search.
      </p>
      <p>
        For more information, check out the excellent&nbsp;
        <a
          href="https://www.algolia.com/doc/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Algolia Documentation
        </a>.
      </p>

    </Col>
  </Row>
);

HelpTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpTab);
