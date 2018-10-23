import React from 'react';
import App, { Container } from 'next/app';
import { createRouter } from 'next/router';

// XXX I don't know what I'm doing here! Here are some files I sniffed thru:
// - https://github.com/zeit/next.js/blob/965f50beb238eab8aafa9be32833b0e7d2947574/packages/next/client/index.js#L94-L101
// - https://github.com/zeit/next.js/blob/82d56e063aad12ac8fee5b9d5ed24ccf725b1a5b/packages/next-server/lib/router/index.js#L98-L103
// - https://github.com/zeit/next.js/blob/785377d3c306b5c89c566f59a846b7829e627654/packages/next/pages/_app.js#L17-L23
createRouter('/', {}, '/');

class NextApp extends App {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export function NextRouterProxy({ nextProxy, ...otherProps }) {
  const { value: NextProxy, next } = nextProxy;

  return (
    <NextApp router={{ pathname: '/', route: '/', query: {}, asPath: '/' }}>
      <NextProxy {...otherProps} nextProxy={next()} />
    </NextApp>
  );
}
