// @flow

import React from 'react';
import styled from 'styled-components';
import { Setup } from './Setup';
import { Test } from './Test';

import type { Node } from 'react';
import type { TTestFilter, TSetup, TTest, TSection } from '../../types';

type Props = {
  section: TSection,
  testFilter: TTestFilter,
  searchText: string
};

export function Section({ section, testFilter, searchText }: Props) {
  return (
    <SectionContainer>
      {section.type === 'setup'
        ? renderSetup(section.setup, testFilter, searchText)
        : renderTest(section.test, testFilter, searchText)}
    </SectionContainer>
  );
}

function renderSetup(
  setup: TSetup,
  testFilter: TTestFilter,
  searchText: string
) {
  const { name } = setup;

  return (
    <LinkableSection id={name}>
      <Setup setup={setup} testFilter={testFilter} searchText={searchText} />
    </LinkableSection>
  );
}

function renderTest(test: TTest, testFilter: TTestFilter, searchText: string) {
  const { name } = test;

  return (
    <LinkableSection id={name}>
      <Test test={test} testFilter={testFilter} searchText={searchText} />
    </LinkableSection>
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
