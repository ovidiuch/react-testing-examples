// @flow

import React, { Component } from 'react';
import Head from 'next/head';
import { App } from '../components/App';
import { gitRef } from '../import-files';
import { getSectionByName } from '../shared/section';
import { getTestKind, getTestKindLabels } from '../shared/testKinds';

import type { TTestKindId } from '../types';

type Query = {
  testKindId: TTestKindId,
  sectionName?: string
};

type Props = {
  testKindId: TTestKindId,
  sectionName?: string
};

export default class Page extends Component<Props> {
  static async getInitialProps({ query }: { query: Query }): Promise<Props> {
    const { testKindId, sectionName } = query;

    return {
      testKindId,
      sectionName
    };
  }

  render() {
    const { testKindId, sectionName } = this.props;
    const testKind = getTestKind(testKindId);
    const testKindLabel = getTestKindLabels()[testKind.id];
    const testKindTitle = `${testKindLabel} — React Testing Examples`;
    const title = sectionName
      ? `${getSectionTitle(testKind, sectionName)} — ${testKindTitle}`
      : testKindTitle;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <App
          gitRef={gitRef}
          testKind={getTestKind(testKindId)}
          sectionName={sectionName}
        />
      </>
    );
  }
}

function getSectionTitle(testKind, sectionName) {
  const { setup, tests } = testKind;
  const section = getSectionByName([setup, ...tests], sectionName);

  return section.readme.meta.title;
}
