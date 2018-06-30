/* eslint-disable global-require */
import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';

import withReduxStore from '../components/withReduxStore';

class CustomApp extends App {
  componentDidUpdate() {
    if (!window.previouslyLoaded) {
      window.previouslyLoaded = true;
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

CustomApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export { CustomApp as DisconnectedCustomApp };

export default withReduxStore(CustomApp);
