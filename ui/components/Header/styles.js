// @flow

import { Button } from '../shared/styles';

export const IconButton = Button.extend`
  display: flex;
  height: 24px;
  line-height: 24px;
  text-decoration: none;

  .icon {
    width: 24px;
    height: 24px;
    background: url(${props => props.icon});
    background-size: 20px;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.6;
  }

  .label {
    padding-left: 2px;
    white-space: nowrap;
    opacity: 0.8;
  }

  :hover {
    .label {
      text-decoration: underline;
    }
  }
`;
