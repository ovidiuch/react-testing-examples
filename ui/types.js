// @flow

export type TTestFilter = 'enzyme' | 'cosmos';

export type TSection = {
  name: string,
  title: string,
  description: string
};

export type TSetup = TSection & {
  files: {
    jest: string, // "global.requestAnimationFrame = cb => setTimeout(cb, 0)..."
    enzyme: string // "import { configure } from 'enzyme'..."
  }
};

export type TTest = TSection & {
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
