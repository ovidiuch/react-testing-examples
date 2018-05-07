// @flow

import React from 'react';
import { App } from '../components/App';
import { setup, tests, gitRef } from '../import-files';

// TODO: Find a better place for this if there will be more than one page.
// Maybe append a webpack entry via next.config.js (#headache)
import '../global';

export default () => <App gitRef={gitRef} setup={setup} tests={tests} />;
