// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';
import rangeParser from 'parse-numeric-range';
import { FileOptions } from '../contexts/FileOptions';

import type { Node } from 'react';

type Props = {
  name: string,
  code: string,
  closed: boolean
};

type State = {
  isOpen: boolean
};

export class File extends Component<Props, State> {
  static defaultProps = {
    closed: false
  };

  state = {
    // Whe only what to derive state from prop initially and preserve local
    // state afterwards
    isOpen: !this.props.closed
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { name, code } = this.props;
    const { isOpen } = this.state;

    return (
      <FileRoot>
        <FileOptions.Consumer>
          {({ showComments, showImports }) => (
            <Fragment>
              <div>
                <Toggle isOpen={isOpen} onToggle={this.handleToggle}>
                  {name}
                </Toggle>
              </div>
              {isOpen && (
                <CodeBlock
                  code={code}
                  showComments={showComments}
                  showImports={showImports}
                />
              )}
            </Fragment>
          )}
        </FileOptions.Consumer>
      </FileRoot>
    );
  }
}

type CodeBlockProps = {
  code: string,
  showComments: boolean,
  showImports: boolean
};

function CodeBlock({ code, showComments, showImports }: CodeBlockProps) {
  let _code = code;
  let highlightLines = [];

  const highlightRes = _code.match(/highlight\{(.+?)\}/);
  if (highlightRes) {
    // XXX: highlight{...} must always be the first line
    _code = _code
      .split('\n')
      .slice(1)
      .join('\n');
    highlightLines = rangeParser.parse(highlightRes[1]);
  }

  // highlight[(.+?)]
  _code = Prism.highlight(_code, Prism.languages.jsx);

  let codeSplits = _code.split(`\n`).map((split, lineIndex) => {
    // TODO: Explain why +2
    if (highlightLines.indexOf(lineIndex + 2) !== -1) {
      return {
        highlighted: true,
        code: `<span class="gatsby-highlight-code-line">${split}\n</span>`
      };
    } else {
      return { code: split };
    }
  });

  if (!showImports) {
    codeSplits = codeSplits.filter(
      split => !split.code.match(/^<span class="token keyword">import<\/span>/)
    );

    // Remove first line if it's empty
    if (codeSplits[0].code === '') {
      codeSplits = codeSplits.slice(1);
    }
  }

  if (!showComments) {
    // XXX: Code blocks are not supported
    codeSplits = codeSplits.filter(
      split =>
        !split.code.match(
          /^(<span class="gatsby-highlight-code-line">\s*)?<span class="token comment">\/\//
        )
    );
  }

  let highlightedCode = ``;
  const lastIdx = codeSplits.length - 1;
  // Don't add back the new line character after highlighted lines
  // as they need to be display: block and full-width.
  codeSplits.forEach((split, idx) => {
    split.highlighted
      ? (highlightedCode += split.code)
      : (highlightedCode += `${split.code}${idx == lastIdx ? `` : `\n`}`);
  });

  return (
    <div className="gatsby-highlight">
      <pre className="gatsby-code-jsx">
        <code
          dangerouslySetInnerHTML={{
            __html: highlightedCode
          }}
        />
      </pre>
    </div>
  );
}

// function stripCode(code: string, showComments: boolean, showImports: boolean) {
//   let cleanCode = code;
//
//   if (!showComments) {
//     // TODO: Support code blocks
//     cleanCode = cleanCode.replace(/ *\/\/.+?\n/g, '');
//   }
//
//   if (!showImports) {
//     cleanCode = cleanCode.replace(/^.*import([^\n]+);\n\n?/s, '');
//   }
//
//   return cleanCode;
// }

type ToggleProps = {
  children: Node,
  isOpen: boolean,
  onToggle: () => mixed
};

function Toggle({ children, isOpen, onToggle }: ToggleProps) {
  return (
    <button onClick={onToggle}>
      {children} {isOpen ? '↑' : '↓'}
    </button>
  );
}

const FileRoot = styled.div`
  margin: 10px;
  font-size: 14px;
`;
