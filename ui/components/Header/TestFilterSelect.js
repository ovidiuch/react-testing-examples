// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import svgChevronDown from '../../svg/triangle-down.svg';

import type { TTestFilter } from '../../types';

type Props = {
  testFilter: TTestFilter,
  onChange: (testFilter: TTestFilter) => mixed
};

// TODO
// const LABELS = {
//   'jest-enzyme': 'Jest & Enzyme',
//   'jest-rtl': 'Jest & RTL',
// };
const LABELS = {
  enzyme: 'Enzyme'
};

export class TestFilterSelect extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;

    if (value === 'enzyme') {
      this.props.onChange(value);
    }

    // TODO: Throw otherwise
  };

  render() {
    const { testFilter } = this.props;

    return (
      <SelectContainer>
        {LABELS[testFilter]}
        <Select value={this.props.testFilter} onChange={this.handleChange}>
          <option value="enzyme">{LABELS.enzyme}</option>
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
