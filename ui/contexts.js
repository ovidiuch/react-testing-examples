// @flow

import { createContext } from 'react';

type FileOptionsValue = {
  showComments: boolean,
  showImports: boolean
};

export const FileOptions = createContext<FileOptionsValue>({
  showComments: false,
  showImports: false
});

export const GitRef = createContext<string>('master');
