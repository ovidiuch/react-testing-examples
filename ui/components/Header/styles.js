// @flow

import styled from 'styled-components';
import { Button } from '../shared/styles';

export const IconButton = styled(Button)`
  display: flex;
  height: 24px;
  font-weight: 400;
  color: #20232a;
  line-height: 24px;
  text-decoration: none;

  .icon {
    width: 24px;
    height: 24px;
    background: url(${props => props.icon});
    background-size: 20px;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.7;
  }

  .label {
    padding-left: 4px;
    white-space: nowrap;
  }

  :hover {
    .label {
      text-decoration: underline;
    }
  }
`;
