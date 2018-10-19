// @flow
/* eslint-env commonjs */

import type { TTestKinds } from './types';

// NOTE: Tests are populated at compile time via import-tests-loader, because
// we're lazy (smart) and don't want to update this file whenever we add a test
export const testKinds: TTestKinds = {};

// NOTE: This is also replaced at compile time with the latest commit SHA
export const gitRef: string = '';
