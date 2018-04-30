// @flow

export type Section = {
  name: string,
  title: string,
  description: string
};

export type Setup = Section & {
  files: {
    jest: string, // "global.requestAnimationFrame = cb => setTimeout(cb, 0)..."
    enzyme: string // "import { configure } from 'enzyme'..."
  }
};

export type Test = Section & {
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
