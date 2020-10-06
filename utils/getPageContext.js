/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      // default: '#F5F7F9', // Cosmic Dashboard bacground
      // default30: 'rgba(245, 247, 249, 0.3)',
      default: '#FFF',
      default30: 'rgba(255, 255, 255, 0.3)',
    },
    primary: {
      contrastText: '#fff',
      main: '#29ABE2', // Cosmic blue
    },
    secondary: {
      main: '#5468ff', // Algolia purple
    },
    text: {
      primary: 'rgba(102, 102, 102)',
    },
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
