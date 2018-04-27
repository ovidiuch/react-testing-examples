// @flow

import React, { Component, Fragment } from 'react';
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
            left={
              <Fragment>
                <File name="jest.config.js" code={jest} closed />
              </Fragment>
            }
            right={
              <Fragment>
                <File name="enzyme.config.js" code={enzyme} closed />
              </Fragment>
            }
          />
        </div>
      </div>
    );
  }
}
