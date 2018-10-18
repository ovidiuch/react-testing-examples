// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import WhatsThis from '../../WHATSTHIS.md';
import { CenterText, H2, H3, Button, Paragraph, Link } from './shared/styles';
import { WindowKeyListener, KEY_ESC } from './shared/WindowKeyListener';

type Props = {
  onClose: () => mixed
};

// TODO: Link projects used to write tests
// TODO: Link projects used to create website
export class AboutModal extends Component<Props> {
  handleContentClick = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.keyCode === KEY_ESC) {
      this.props.onClose();
    }
  };

  render() {
    let { onClose } = this.props;

    return (
      <WindowKeyListener onKeyDown={this.handleKeyDown}>
        <Overlay onClick={onClose}>
          <Content onClick={this.handleContentClick}>
            <WhatsThis
              components={{
                h2: H2,
                h3: H3,
                p: Paragraph,
                a: props => <SubtleLink target="_blank" {...props} />,
                ol: OpinionsList
              }}
            />
            <ButtonContainer>
              <GoButton onClick={onClose}>Show me some tests</GoButton>
            </ButtonContainer>
          </Content>
        </Overlay>
      </WindowKeyListener>
    );
  }
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 32px 12px;
  background: rgba(221, 224, 232, 0.9);
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = styled(CenterText)`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 15px 0 rgba(32, 35, 42, 0.2);
  overflow: hidden;
  padding: 8px 24px 16px 24px;

  @media (min-width: 480px) {
    padding: 8px 36px 16px 36px;
  }
`;

const ButtonContainer = styled.div`
  text-align: right;
`;

const OpinionsList = styled.ol`
  padding-left: 36px;
`;

const SubtleLink = styled(Link)`
  color: #20232a;
  font-weight: 500;
`;

const GoButton = styled(Button)`
  display: inline-block;
  padding: 12px 20px;
  border-radius: 5px;
  background: #2b51ad;
  color: #f5f7f9;
  line-height: 24px;
`;
