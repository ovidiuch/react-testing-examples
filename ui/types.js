// @flow

export type TTestFilter = 'enzyme' | 'cosmos';

export type TSection = {
  name: string,
  title: string,
  description: Array<string>
};

export type TInfo = {
  title: string,
  description: Array<string>
};

export type TSetup = {
  name: string,
  info: TInfo,
  files: {
    jest: string, // "global.requestAnimationFrame = cb => setTimeout(cb, 0)..."
    enzyme: string // "import { configure } from 'enzyme'..."
  }
};

export type TTest = {
  name: string,
  info: TInfo,
  files: {
    components: string, // "import React, { Component } from 'react'..."
    enzyme: {
      test: string // "import { mount } from 'enzyme'..."
    },
    cosmos: {
      test: string, // "import createContext from 'react-cosmos-test/enzyme'..."
      fixture: string, // "import { StatefulCounter } from './components'..."
      proxies?: string // "import createRouterProxy from 'react-cosmos-router-proxy'..."
    }
  }
};
