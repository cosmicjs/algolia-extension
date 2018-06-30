import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';


const Entry = ({ classes, hit }) => (
  <div className={classes.root}>
    <div className={classes.infoContainer}>
      {
        Object.keys(hit).filter(key => key !== '_highlightResult').map(key => (
          <div className={classes.defaultText} key={key}>
            <strong>{`${key}: `}</strong>
            <span>{JSON.stringify(hit[key])}</span>
          </div>
        ))
      }
    </div>
  </div>
);

Entry.propTypes = {
  classes: PropTypes.object.isRequired,
  hit: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entry);
