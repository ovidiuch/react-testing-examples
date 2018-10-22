// @flow

import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import svgChevronDown from '../../svg/triangle-down.svg';
import { TEST_KIND_LABELS } from '../../shared/testKinds';

import type { TTestKindId } from '../../types';

type Props = {
  value: TTestKindId
};

export class TestKindSelect extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    Router.push(`/index?testKindId=${value}`, `/${value}`);
  };

  render() {
    const { value } = this.props;

    return (
      <SelectContainer>
        {TEST_KIND_LABELS[value]}
        <Select value={this.props.value} onChange={this.handleChange}>
          {Object.keys(TEST_KIND_LABELS).map(testKindId => (
            <option key={testKindId} value={testKindId}>
              {TEST_KIND_LABELS[testKindId]}
            </option>
          ))}
        </Select>
      </SelectContainer>
    );
  }
}

const SelectContainer = styled.div`
  position: relative;
  padding-right: 16px;
  height: 24px;
  background: url(${svgChevronDown});
  background-size: 10px;
  background-position: calc(100%) 6px;
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
