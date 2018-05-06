// @flow

import type { ComponentType } from 'react';

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
  code: {
    jest: {
      config: string,
      setup: string
    },
    enzyme: string
  }
};

export type TTest = {
  name: string,
  readme: TReadme,
  code: {
    components: string,
    enzyme: {
      test: string
    },
    cosmos: {
      test: string,
      fixture: string,
      proxies?: string
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
