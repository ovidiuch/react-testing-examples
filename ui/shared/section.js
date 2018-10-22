// @flow

import type { TTestKindId, TSection } from '../types';

type Props = {
  testKindId: TTestKindId,
  sectionName?: string
};

export function hasSectionChanged(props: Props, prevProps: Props) {
  return (
    props.testKindId !== prevProps.testKindId ||
    props.sectionName !== prevProps.sectionName
  );
}

export function getSectionByName(
  sections: TSection[],
  sectionName: string
): TSection {
  const section = sections.find(s => s.name === sectionName);

  if (!section) {
    throw new Error(`Not found section with name "${sectionName}"`);
  }

  return section;
}
