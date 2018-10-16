// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import svgChevronDown from '../../svg/triangle-down.svg';

import type { TTestFilter } from '../../types';

type Props = {
  testFilter: TTestFilter,
  onChange: (testFilter: TTestFilter) => mixed
};

const LABELS = {
  enzyme: 'Enzyme',
  cosmos: 'Enzyme & Cosmos'
};

export class TestFilterSelect extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;

    if (value === 'enzyme' || value === 'cosmos') {
      this.props.onChange(value);
    }
  };

  render() {
    const { testFilter } = this.props;

    return (
      <SelectContainer>
        {LABELS[testFilter]}
        <Select value={this.props.testFilter} onChange={this.handleChange}>
          <option value="enzyme">{LABELS.enzyme}</option>
          <option value="cosmos">{LABELS.cosmos}</option>
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
