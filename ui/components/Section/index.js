// @flow

import React from 'react';
import styled from 'styled-components';
import { CenterText } from '../shared/styles';
import { File } from '../File';
import { Readme } from './Readme';

import type { Node } from 'react';
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
      <LinkableSection id={name}>
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
      </LinkableSection>
    </SectionContainer>
  );
}

type LinkableSectionProps = {
  id: string,
  children: Node
};

function LinkableSection({ id, children }: LinkableSectionProps) {
  return (
    <>
      <SectionLocation id={id} />
      {children}
    </>
  );
}

const SectionContainer = styled.div`
  margin-top: 48px;
  background: #f5f7f9;
  color: #20232a;
`;

// XXX: Hack for #links to jump to content under sticky header
const SectionLocation = styled.div`
  position: absolute;
  margin-top: -128px;
`;
