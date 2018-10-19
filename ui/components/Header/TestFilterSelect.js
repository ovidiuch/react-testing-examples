// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import svgChevronDown from '../../svg/triangle-down.svg';

import type { TTestKindId } from '../../types';

type Props = {
  testFilter: TTestKindId,
  onChange: (testFilter: TTestKindId) => mixed
};

// TODO: Load test kinds dynamically (and replace hardcoded values)
const LABELS = {
  'jest-enzyme': 'Jest & Enzyme',
  'jest-rtl': 'Jest & RTL'
};

export class TestFilterSelect extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onChange } = this.props;
    const { value } = e.currentTarget;

    onChange(value);
  };

  render() {
    const { testFilter } = this.props;

    return (
      <SelectContainer>
        {LABELS[testFilter]}
        <Select value={this.props.testFilter} onChange={this.handleChange}>
          {Object.keys(LABELS).map(testKindId => (
            <option key={testKindId} value={testKindId}>
              {LABELS[testKindId]}
            </option>
          ))}
        </Select>
      </SelectContainer>
    );
  }
}

const SelectContainer = styled.div`
  position: relative;
  padding-right: 22px;
  height: 24px;
  background: url(${svgChevronDown});
  background-size: 10px;
  background-position: calc(100% - 5px) 6px;
  background-repeat: no-repeat;
  line-height: 24px;
  white-space: nowrap;

  :hover {
    text-decoration: underline;
  }
`;

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  background: transparent;
  line-height: 24px;
  white-space: nowrap;
  cursor: pointer;
  appearance: none;
  opacity: 0;
`;
