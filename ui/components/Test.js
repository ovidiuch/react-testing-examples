// @flow

import React, { Component, Fragment } from 'react';
import { File } from './File';
import { LeftRight } from './LeftRight';

import type { Test as TypeTest } from '../types';

type Props = {
  test: TypeTest
};

export class Test extends Component<Props> {
  render() {
    const { title, files } = this.props.test;
    const { components, enzyme, cosmos } = files;

    return (
      <div>
        <h2>{title}</h2>
        <div>
          <File name="components.js" code={components} closed />
          <LeftRight
            left={
              <Fragment>
                <h3>Just Enzyme</h3>
                <File name="enzyme.test.js" code={enzyme.test} />
              </Fragment>
            }
            right={
              <Fragment>
                <h3>Enzyme with Cosmos</h3>
                {cosmos.proxies && (
                  <File name="cosmos.proxies.js" code={cosmos.proxies} closed />
                )}
                <File name="fixture.js" code={cosmos.fixture} />
                <File name="cosmos.test.js" code={cosmos.test} />
              </Fragment>
            }
          />
        </div>
      </div>
    );
  }
}
