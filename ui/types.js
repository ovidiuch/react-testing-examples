// @flow

import type { ComponentType } from 'react';

type RawFile = string;

export type TTestFilter = 'enzyme' | 'cosmos';

export type TReadmeText = {
  title: string,
  body: Array<string>
};

export type TReadme = {
  text: TReadmeText,
  markup: ComponentType<*>
};

export type TSetup = {
  name: string,
  readme: TReadme,
  files: {
    jest: RawFile,
    enzyme: RawFile
  }
};

// TODO: Rename files to code
export type TTest = {
  name: string,
  readme: TReadme,
  files: {
    components: RawFile,
    enzyme: {
      test: RawFile
    },
    cosmos: {
      test: RawFile,
      fixture: RawFile,
      proxies?: RawFile
    }
  }
};

export type TSection =
  | {
      type: 'setup',
      setup: TSetup
    }
  | {
      type: 'test',
      test: TTest
    };
