// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import WhatsThis from '../../WHATSTHIS.md';
import { CenterText, H2, H3, Button, Paragraph, Link } from './shared/styles';

type Props = {
  onClose: () => mixed
};

export class AboutModal extends Component<Props> {
  handleContentClick = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  render() {
    let { onClose } = this.props;

    return (
      <Overlay onClick={onClose}>
        <Content onClick={this.handleContentClick}>
          <WhatsThis
            components={{
              h2: H2,
              h3: H3,
              p: Paragraph,
              a: props => <SublimeLink target="_blank" {...props} />,
              ol: OpinionsList
            }}
          />
          <ButtonContainer>
            <GoButton onClick={onClose}>Show me the tests</GoButton>
          </ButtonContainer>
        </Content>
      </Overlay>
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
  background: rgba(247, 247, 247, 0.9);
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = CenterText.extend`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  margin: 16px 0;
  text-align: right;
`;

const OpinionsList = styled.ol`
  padding-left: 36px;
`;

const SublimeLink = Link.extend`
  color: #222;
`;

const GoButton = Button.extend`
  display: inline-block;
  padding: 12px 16px;
  border-radius: 5px;
  background: #0366d6;
  color: #fff;
  line-height: 24px;
`;
