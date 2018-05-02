// @flow

type RawFile = string;

export type TTestFilter = 'enzyme' | 'cosmos';

export type TInfo = {
  title: string,
  description: Array<string>
};

export type TSetup = {
  name: string,
  info: TInfo,
  files: {
    jest: RawFile,
    enzyme: RawFile
  }
};

export type TTest = {
  name: string,
  info: TInfo,
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
