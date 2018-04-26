// @flow

export type Test = {
  name: string, // "click-callback"
  title: string, // "Function prop is called on click"
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
