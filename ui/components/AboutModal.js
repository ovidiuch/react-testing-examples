// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import WhatsThis from '../../WHATSTHIS.md';
import { CenterText, H2, H3, Button, Paragraph, Link } from './shared/styles';

type Props = {
  onClose: () => mixed
};

// TODO: Close on ESC
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
              a: props => <SubtleLink target="_blank" {...props} />,
              ol: OpinionsList
            }}
          />
          <ButtonContainer>
            <GoButton onClick={onClose}>Show me some tests</GoButton>
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
  background: rgb(221, 224, 232, 0.9);
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = CenterText.extend`
  background: #fff;
  border-radius: 10px;
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

const SubtleLink = Link.extend`
  color: #20232a;
  font-weight: 500;
`;

const GoButton = Button.extend`
  display: inline-block;
  padding: 12px 16px;
  border-radius: 5px;
  background: #2b51ad;
  color: #f5f7fa;
  line-height: 24px;
`;
