// @flow

import React from 'react';
import styled from 'styled-components';
import { extractCodeLines } from './shared';
import { StyledCode, PrismStyledCode } from './style';

type Props = {
  code: string,
  showComments: boolean,
  showImports: boolean
};

export function Code({ code, showComments, showImports }: Props) {
  const lines = extractCodeLines({ code, showComments, showImports });
  const visibleLines = lines.filter(l => !l.isHidden);

  return (
    <Container>
      <Highlights>
        <StyledCode>
          {visibleLines.map(line => (
            <HlLine highlight={line.isHighlighted}>{line.rawCode}</HlLine>
          ))}
        </StyledCode>
      </Highlights>
      {true && (
        <ColoredCode>
          <PrismStyledCode
            dangerouslySetInnerHTML={{
              __html: visibleLines.map(l => l.coloredCode).join('\n')
            }}
          />
        </ColoredCode>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Highlights = styled.pre`
  background: #282c34;
  border-radius: 10px;
  margin: 0;
  padding: 16px 0;
  overflow: auto;
  color: transparent;
`;

const HlLine = styled.div`
  min-height: 24px; /* Required for empty lines to take space */
  padding: 0 24px;
  background: ${props => (props.highlight ? '#14161a' : 'transparent')};

  :last-child {
    min-height: auto;
  }
`;

const ColoredCode = styled.pre`
  /* Stay on top of the highlights */
  position: absolute;
  top: 0;

  margin: 0;
  padding: 16px 24px;
  background: transparent;
  color: #ffffff;
`;
