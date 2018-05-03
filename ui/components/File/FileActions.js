// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import Clipboard from 'clipboard';
import { GitCommit } from '../../contexts';
import svgClippy from '../../svg/clippy.svg';
import svgLinkExternal from '../../svg/link-external.svg';

const { now } = Date;

type Props = {
  filePath: string,
  code: string
};

type CopyStatus = null | 'success' | 'error';

type State = {
  copyStatus: CopyStatus,
  copyTime: number
};

export class FileActions extends Component<Props, State> {
  clipboard: ?typeof Clipboard;

  state = {
    copyStatus: null,
    copyTime: 0
  };

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  handleCopyBtnRef = (node: ?HTMLElement) => {
    if (node) {
      const clipboard = new Clipboard(node);
      clipboard.on('success', this.handleCopySuccess);
      clipboard.on('error', this.handleCopyError);

      this.clipboard = clipboard;
    } else {
      this.clipboard = null;
    }
  };

  handleCopySuccess = () => {
    this.setState({
      copyStatus: 'success',
      copyTime: now()
    });
  };

  handleCopyError = () => {
    this.setState({
      copyStatus: 'error',
      copyTime: now()
    });
  };

  render() {
    const { filePath, code } = this.props;
    const { copyStatus, copyTime } = this.state;

    return (
      <GitCommit.Consumer>
        {commitSha => (
          <Container>
            <CopyLink
              key={copyTime}
              title="Copy code"
              status={copyStatus}
              innerRef={this.handleCopyBtnRef}
              data-clipboard-text={code}
            />
            <OpenFileLink
              target="_blank"
              title="Open in GitHub"
              href={getFileUrl(commitSha, filePath)}
            />
          </Container>
        )}
      </GitCommit.Consumer>
    );
  }
}

const PROJECT_ROOT_URL = 'https://github.com/skidding/react-testing-examples';

function getFileUrl(gitCommit: string, filePath: string) {
  return `${PROJECT_ROOT_URL}/blob/${gitCommit}/${filePath}`;
}

const Container = styled.div`
  display: flex;
  padding-top: 2px;
`;

const Action = styled.button`
  border: 0;
  width: 32px;
  height: 32px;
  background-color: transparent;
  background-size: 16px;
  background-position: 8px 6px;
  background-repeat: no-repeat;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
  outline: none;

  :hover {
    opacity: 0.8;
  }
`;

const CopyLink = Action.extend`
  background-image: url(${svgClippy});
  animation: flash 3s;

  @keyframes flash {
    from {
      background-color: ${props => getCopyBgColorByStatus(props.status)};
    }
    to {
      background-color: transparent;
    }
  }
`;

const OpenFileLink = Action.withComponent('a').extend`
  background-image: url(${svgLinkExternal});
`;

function getCopyBgColorByStatus(status: CopyStatus) {
  switch (status) {
    case 'success':
      return '#64e88d';
    case 'error':
      return '#f14342';
    default:
      return 'transparent';
  }
}
