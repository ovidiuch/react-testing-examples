// @flow

import React, { Component } from 'react';
import Head from 'next/head';
import { App } from '../components/App';
import { gitRef } from '../import-files';
import { getTestKind, getTestKindLabel } from '../shared/testKinds';

import type { TTestKindId } from '../types';

type Query = {
  testKindId: TTestKindId
};

type Props = {
  testKindId: TTestKindId
};

export default class Page extends Component<Props> {
  static async getInitialProps({ query }: { query: Query }): Promise<Props> {
    const { testKindId } = query;

    return {
      testKindId
    };
  }

  render() {
    const { testKindId } = this.props;

    return (
      <>
        <Head>
          <title>{getTestKindLabel(testKindId)} - React Testing Examples</title>
        </Head>
        <App
          gitRef={gitRef}
          testKind={getTestKind(testKindId)}
          selTestKindId={testKindId}
        />
      </>
    );
  }
}
