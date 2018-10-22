// @flow

import type { TTestKindId } from '../../types';

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
