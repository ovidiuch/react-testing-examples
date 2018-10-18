// @flow

import type { ComponentType } from 'react';

// TODO: 'jest-rtl' | 'jest-enzyme'
export type TTestFilter = 'enzyme';

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
      config: string
    },
    enzyme: {
      setup: string
    },
    rtl: {
      setup: string
    }
  }
};

export type TTest = {
  name: string,
  readme: TReadme,
  code: {
    component: string,
    enzyme: {
      test: string
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
