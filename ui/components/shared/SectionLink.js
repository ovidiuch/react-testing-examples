// @flow

import React from 'react';
import Link from 'next/link';
import queryString from 'query-string';
import { DEFAULT_TEST_KIND_ID } from '../../shared/testKinds';

import type { Node } from 'react';
import type { TTestKindId } from '../../types';

type Props = {
  children: Node,
  testKindId: TTestKindId,
  sectionName?: string
};

export function SectionLink({ children, testKindId, sectionName }: Props) {
  const params = { testKindId, sectionName };
  const url = getUrl(testKindId, sectionName);

  return (
    <Link href={`/index?${queryString.stringify(params)}`} as={url}>
      {children}
    </Link>
  );
}

export function getUrl(testKindId: TTestKindId, sectionName?: string) {
  if (sectionName) {
    return `/${testKindId}/${sectionName}`;
  }

  return testKindId === DEFAULT_TEST_KIND_ID ? '/' : `/${testKindId}`;
}
