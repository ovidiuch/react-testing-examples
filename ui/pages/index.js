// @flow

import React, { Component } from 'react';
import Head from 'next/head';
import { App } from '../components/App';
import { gitRef } from '../import-files';
import { getSectionByName } from '../shared/section';
import { TEST_KIND_LABELS, getTestKind } from '../shared/testKinds';

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

    return (
      <>
        <Head>
          <title>{getPageTitle(testKindId, sectionName)}</title>
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

function getPageTitle(testKindId, sectionName) {
  const testKind = getTestKind(testKindId);

  return sectionName
    ? getSectionPageTitle(testKind, sectionName)
    : getTestKindPageTitle(testKind);
}

function getSectionPageTitle(testKind, sectionName) {
  const { setup, tests } = testKind;
  const section = getSectionByName([setup, ...tests], sectionName);

  return `${getSectionTitle(section)} — ${getTestKindPageTitle(testKind)}`;
}

function getTestKindPageTitle(testKind) {
  const testKindLabel = TEST_KIND_LABELS[testKind.id];

  return `${testKindLabel} — React Testing Examples`;
}

function getSectionTitle(section) {
  return section.readme.meta.title;
}
