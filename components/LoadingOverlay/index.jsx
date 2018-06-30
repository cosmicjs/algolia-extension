import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import styles from './styles';

const LoadingOverlay = ({ classes, visible }) => (
  <div
    className={classnames(
      classes.root,
      {
        [classes.hidden]: !visible,
        [classes.visible]: visible,
      },
    )}
  >
    <div className={classnames('spinner', classes.spinner)}>
      <div className={classnames('dot1', classes.dot)} />
      <div className={classnames('dot2', classes.dot)} />
    </div>
    <style jsx>
      {`
        .spinner {
          -webkit-animation: sk-rotate 2.0s infinite linear;
          animation: sk-rotate 2.0s infinite linear;
        }

        .dot1, .dot2 {
          -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
          animation: sk-bounce 2.0s infinite ease-in-out;
        }

        .dot2 {
          top: auto;
          bottom: 0;
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }

        @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
        @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

        @-webkit-keyframes sk-bounce {
          0%, 100% { -webkit-transform: scale(0.0) }
          50% { -webkit-transform: scale(1.0) }
        }

        @keyframes sk-bounce {
          0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
          } 50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
          }
        }
      `}
    </style>
  </div>
);

LoadingOverlay.defaultProps = {
  visible: false,
};

LoadingOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

export default withStyles(styles)(LoadingOverlay);
