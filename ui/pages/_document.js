import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GlobalStyle } from '../global-style';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#20232a" />
          <link rel="icon" href="/static/favicon.ico" />
          {this.props.styleTags}
        </Head>
        <body>
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
