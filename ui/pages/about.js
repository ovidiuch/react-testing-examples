// @flow

import React from 'react';
import { App } from '../components/App';
import { setup, tests, gitRef } from '../import-files';

export default () => (
  <App gitRef={gitRef} setup={setup} tests={tests} showAbout />
);
