// @flow

import React from 'react';
import { App } from '../components/App';
import { gitRef } from '../import-files';
import { getTestKind } from '../shared/testKinds';

export default () => <App gitRef={gitRef} testKind={getTestKind()} showAbout />;
