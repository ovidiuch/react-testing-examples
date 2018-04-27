// @flow

import React, { Component } from 'react';
import { File } from './File';
import { LeftRight } from './LeftRight';

import type { Setup as SetupTest } from '../types';

type Props = {
  setup: SetupTest
};

export class Setup extends Component<Props> {
  render() {
    const { title, files } = this.props.setup;
    const { jest, enzyme } = files;

    return (
      <div>
        <h2>{title}</h2>
        <div>
          <LeftRight
            left={<File name="jest.config.js" code={jest} closed />}
            right={<File name="enzyme.config.js" code={enzyme} closed />}
          />
        </div>
      </div>
    );
  }
}
