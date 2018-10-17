// @flow

import React from 'react';
import { escape } from 'lodash';
import styled from 'styled-components';
import Prism from 'prismjs';
import { parseCode } from './shared';

type Props = {
  code: string,
  showComments: boolean,
  showImports: boolean
};

export function Code({ code, showComments, showImports }: Props) {
  const { highlightLines, cleanCode } = parseCode(code);

  const lines = getLinesFromCode(
    cleanCode,
    highlightLines,
    showComments,
    showImports
  );

  // Generate syntax highlighting using Prism
  const codeMarkup = Prism.highlight(cleanCode, Prism.languages.jsx, 'jsx');

  // Apply line highlighting based on previous line.highlighted annotations
  const linesWithMarkup = getLinesWithMarkup(codeMarkup, lines);

  // Only hide lines after lines have been highlighted (to not mess with the
  // line numbers)
  const linesVisible = linesWithMarkup.filter((l, idx) => !lines[idx].hidden);
  // const visibleMarkup = joinMarkupLines(linesVisible);
  // const visibleMarkup = joinMarkupLines(linesVisible);

  return (
    <Container>
      <Background>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: joinMarkupLines(
                linesVisible.map(l => ({
                  ...l,
                  code: l.highlighted
                    ? `<span class="highlight-code-line">${escape(
                        l.code
                      )}\n</span>`
                    : escape(l.code)
                }))
              )
            }}
          />
        </pre>
      </Background>
      <CodeHighlight>
        <pre className="code-jsx">
          <code
            dangerouslySetInnerHTML={{
              __html: linesVisible.map(l => l.markup).join('\n')
            }}
          />
        </pre>
      </CodeHighlight>
    </Container>
  );
}

function getLinesFromCode(
  code: string,
  highlightLines: Array<number>,
  showComments: boolean,
  showImports: boolean
): Array<{ code: string, highlighted: boolean, hidden: boolean }> {
  let lines = code.split('\n').map((code, lineIndex) => ({
    code,
    highlighted: isLineHighlighted(code, lineIndex, highlightLines),
    hidden:
      (!showComments && isCommentLine(code)) ||
      (!showImports && isImportLine(code))
  }));

  // Hide first line if it's empty (happens after hidding imports)
  let firstVisibleLine = lines.filter(l => !l.hidden)[0];
  if (firstVisibleLine && firstVisibleLine.code === '') {
    const firstVisibleLineIndex = lines.indexOf(firstVisibleLine);
    lines = [
      ...lines.slice(0, firstVisibleLineIndex),
      { ...firstVisibleLine, hidden: true },
      ...lines.slice(firstVisibleLineIndex + 1)
    ];
  }

  return lines;
}

function isLineHighlighted(
  line: string,
  lineIndex: number,
  highlightLines: Array<number>
): boolean {
  // +1 line because lines start from 0 programatically, and +1 because we
  // remove the first line with the highlight{...} comment
  return highlightLines.indexOf(lineIndex + 2) !== -1;
}

function isImportLine(code: string): boolean {
  return Boolean(code.match(/^import /));
}

function isCommentLine(code: string): boolean {
  return Boolean(code.match(/^\s*\/\//));
}

function getLinesWithMarkup(codeMarkup, lines) {
  let markupLines = codeMarkup.split('\n');

  return lines.map((line, idx) => ({
    ...line,
    markup: markupLines[idx]
  }));
  // return lines.map((line, idx) => ({
  //   ...line,
  //   markup: line.highlighted
  //     ? `<span class="highlight-code-line">${markupLines[idx]}\n</span>`
  //     : markupLines[idx]
  // }));
}

function joinMarkupLines(lines) {
  // Code inspired from Gatsby codebase
  // https://github.com/gatsbyjs/gatsby/blob/3b647d707cb6e35be6e963c309ef12f9b8e11fc3/packages/gatsby-remark-prismjs/src/highlight-code.js#L23-L48
  let markup = '';
  const lastIdx = lines.length - 1;

  // Don't add back the new line character after highlighted lines
  // as they need to be display: block and full-width.
  lines.forEach((line, idx) => {
    markup += line.highlighted
      ? line.code
      : `${line.code}${idx === lastIdx ? '' : '\n'}`;
  });

  return markup;
}

const Container = styled.div`
  position: relative;
`;

const Background = styled.div`
  background: #282c34;

  border-radius: 10px;
  padding: 16px 24px;
  overflow: auto;
  color: transparent;

  pre,
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace !important;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  pre {
    height: auto !important;
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .highlight-code-line {
    background-color: #14161a;
    display: block;
    margin: 0 calc(-24px);
    padding: 0 calc(24px);
  }
`;

// Styles copied from
// https://github.com/reactjs/reactjs.org/blob/942e83ef396199f499830792b1c61a9c6c990f29/src/prism-styles.js
const CodeHighlight = styled.div`
  position: absolute;
  top: 0;

  background: transparent;
  color: #ffffff;
  border-radius: 10px;
  padding: 16px 24px;
  overflow: auto;

  pre,
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace !important;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code[class*='code-'],
  pre[class*='code-'],
  pre.prism-code {
    height: auto !important;
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .token.attr-name {
    color: #c5a5c5;
  }
  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999999;
  }
  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #5a9bcf;
  }
  .token.boolean {
    color: #ff8b50;
  }
  .token.tag {
    color: #fc929e;
  }
  .token.string {
    color: #8dc891;
  }
  .token.punctuation {
    color: #5fb3b3;
  }
  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #d8dee9;
  }
  .token.function {
    color: #79b6f2;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: #d7deea;
  }
  .token.attr-value {
    color: #8dc891;
  }
  .token.keyword {
    color: #c5a5c5;
  }
  .token.atrule,
  .token.class-name {
    color: #fac863;
  }
  .token.important {
    font-weight: 400;
  }
  .token.bold {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .namespace {
    opacity: 0.7;
  }
`;
