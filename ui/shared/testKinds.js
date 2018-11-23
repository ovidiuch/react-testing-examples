// @flow

import { testKinds } from '../import-files';

import type { TTestKindId } from '../types';

export const TEST_KIND_LABELS = {
  'jest-enzyme': 'Enzyme',
  'jest-rtl': 'react-testing-library',
  'jest-interactor': '@bigtest/interactor'
};

export const DEFAULT_TEST_KIND_ID = 'jest-rtl';

export function getTestKind(testKindId?: TTestKindId) {
  return testKinds[testKindId || DEFAULT_TEST_KIND_ID];
}
