// @flow

import React from 'react';
import { App } from '../components/App';
import { testKinds, gitRef } from '../import-files';

export default () => <App gitRef={gitRef} testKinds={testKinds} showAbout />;
