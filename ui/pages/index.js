// @flow

import React from 'react';
import { App } from '../components/App';
import { setup, tests, gitRef } from '../import-files';

// TODO: Find a better place for this if there will be more than one page
import '../global';

// TODO: Rename "commitSha" to "gitRef"
export default () => <App commitSha={gitRef} setup={setup} tests={tests} />;
