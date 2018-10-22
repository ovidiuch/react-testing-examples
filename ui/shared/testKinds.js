// @flow

import { testKinds } from '../import-files';

import type { TTestKindId } from '../types';

const TEST_KIND_LABELS = {
  'jest-enzyme': 'Enzyme',
  'jest-rtl': 'react-testing-library'
};

const DEFAULT_TEST_KIND_ID = 'jest-rtl';

export function getTestKind(testKindId?: TTestKindId) {
  return testKinds[testKindId || DEFAULT_TEST_KIND_ID];
}

export function getTestKindLabel(testKindId?: TTestKindId) {
  return TEST_KIND_LABELS[testKindId || DEFAULT_TEST_KIND_ID];
}

export function getTestKindLabels() {
  return TEST_KIND_LABELS;
}
