// @flow

import type { ComponentType } from 'react';

export type TTestKindId = string;

export type TReadmeMeta = {
  title: string,
  body: Array<string>
};

export type TReadme = {
  meta: TReadmeMeta,
  component: ComponentType<*>
};

export type TSection = {
  name: string,
  readme: TReadme,
  files: { [string]: string }
};

export type TTestKind = {
  id: TTestKindId,
  setup: TSection,
  tests: TSection[]
};

export type TTestKinds = {
  [id: TTestKindId]: TTestKind
};
