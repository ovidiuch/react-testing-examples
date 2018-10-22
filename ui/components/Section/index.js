// @flow

import React from 'react';
import styled from 'styled-components';
import { CenterText } from '../shared/styles';
import { File } from '../File';
import { Readme } from './Readme';

import type { TTestKindId, TSection } from '../../types';

type Props = {
  testKindId: TTestKindId,
  section: TSection,
  searchText: string
};

export function Section({ testKindId, section, searchText }: Props) {
  const { name, readme, files } = section;

  return (
    <SectionContainer>
      <CenterText>
        <Readme
          testKindId={testKindId}
          sectionName={name}
          readme={readme}
          searchText={searchText}
        />
      </CenterText>
      {Object.keys(files).map(filePath => (
        <File
          key={filePath}
          name={filePath}
          filePath={`${testKindId}/${name}/${filePath}`}
          code={files[filePath]}
        />
      ))}
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  margin-top: 48px;
  background: #f5f7f9;
  color: #20232a;
`;
