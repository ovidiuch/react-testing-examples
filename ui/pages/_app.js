import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { GlobalStyle } from '../global-style';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (!Component.getInitialProps) {
      return {};
    }

    return Component.getInitialProps(ctx);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>React Testing Examples</title>
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    );
  }
}
