// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import svgChevronDown from '../../svg/triangle-down.svg';
import { getTestKindLabels } from '../../shared/testKinds';

import type { TTestKindId } from '../../types';

type Props = {
  value: TTestKindId,
  onChange: (value: TTestKindId) => mixed
};

export class TestKindSelect extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onChange } = this.props;
    const { value } = e.currentTarget;

    onChange(value);
  };

  render() {
    const labels = getTestKindLabels();
    const { value } = this.props;

    return (
      <SelectContainer>
        {labels[value]}
        <Select value={this.props.value} onChange={this.handleChange}>
          {Object.keys(labels).map(testKindId => (
            <option key={testKindId} value={testKindId}>
              {labels[testKindId]}
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
