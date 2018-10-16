// @flow

import React, { Component } from 'react';
import { CenterText } from '../shared/styles';
import { File } from '../File';
import { Readme } from './Readme';

import type { TSetup } from '../../types';

type Props = {
  setup: TSetup,
  searchText: string
};

export class Setup extends Component<Props> {
  render() {
    const { setup, searchText } = this.props;
    const {
      name,
      readme,
      code: { jest }
    } = setup;

    return (
      <>
        <CenterText>
          <Readme name={name} readme={readme} searchText={searchText} />
        </CenterText>
        <File
          name="jest.config.js"
          filePath="jest.config.js"
          code={jest.config}
          closed
        />
        <File name="jest.setup.js" filePath="jest.setup.js" code={jest.setup} />
      </>
    );
  }
}
