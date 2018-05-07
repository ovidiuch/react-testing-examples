// @flow

import { createContext } from 'react';

export const FileOptions = createContext({
  showComments: false,
  showImports: false
});

export const GitRef = createContext('master');
