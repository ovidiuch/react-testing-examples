// @flow

import React from 'react';
import styled from 'styled-components';
import { match } from 'fuzzaldrin-plus';
import { shouldSearch } from '../../search';

type Props = {
  searchText: string,
  targetText: string
};

export function FuzzyHighlighter({ searchText, targetText }: Props) {
  if (!shouldSearch(searchText)) {
    return targetText;
  }

  const fuzzyMatch = match(targetText, searchText);
  if (fuzzyMatch.length === 0) {
    return targetText;
  }

  const chars = [];
  fuzzyMatch.forEach((hlIndex, index) => {
    // If the first character isn't highlighted, push the initial
    // unhighlighted characters
    if (index === 0 && hlIndex !== 0) {
      chars.push(targetText.slice(0, hlIndex));
    }

    // Push the highlighted character
    const hlChar = targetText.slice(hlIndex, hlIndex + 1);
    chars.push(<Mark key={index}>{hlChar}</Mark>);

    // If the next character isn't highlighted,
    // push the subsequent unhighlighted characters
    const nextHlIndex = fuzzyMatch[index + 1];
    if (nextHlIndex !== hlIndex + 1) {
      chars.push(targetText.slice(hlIndex + 1, nextHlIndex));
    }
  });

  return chars;
}

const Mark = styled.mark`
  background-color: rgba(255, 229, 100, 0.5);
  color: inherit;
`;
