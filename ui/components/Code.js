// @flow

import React from 'react';
import Prism from 'prismjs';
import rangeParser from 'parse-numeric-range';

type Props = {
  code: string,
  showComments: boolean,
  showImports: boolean
};

export function Code({ code, showComments, showImports }: Props) {
  let highlightLines = getHighlightLines(code);
  let cleanCode = code;

  if (highlightLines.length > 0) {
    cleanCode = getCodeWithoutHighlightComment(cleanCode);
  }

  let lines = getLinesFromCode(
    cleanCode,
    highlightLines,
    showComments,
    showImports
  );

  // Apply syntax highlighting using Prism
  let codeMarkup = Prism.highlight(
    lines.map(l => l.code).join('\n'),
    Prism.languages.jsx
  );

  // Apply line highlighting based on previous line.highlighted annotations
  let linesWithMarkup = getLinesWithMarkup(codeMarkup, lines);

  // Only hide lines after lines have been highlighted (to not mess with the
  // line numbers)
  let linesVisible = linesWithMarkup.filter((l, idx) => !lines[idx].hidden);
  let visibleMarkup = joinMarkupLines(linesVisible);

  return (
    <div className="gatsby-highlight">
      <pre className="gatsby-code-jsx">
        <code
          dangerouslySetInnerHTML={{
            __html: visibleMarkup
          }}
        />
      </pre>
    </div>
  );
}

function getHighlightLines(code: string): Array<number> {
  let res = code.match(/highlight\{(.+?)\}/);

  return res ? rangeParser.parse(res[1]) : [];
}

function getCodeWithoutHighlightComment(code: string): string {
  // XXX: `highlight{...}` comment must always be the first line
  return code
    .split('\n')
    .slice(1)
    .join('\n');
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
    markup: line.highlighted
      ? `<span class="gatsby-highlight-code-line">${markupLines[idx]}\n</span>`
      : markupLines[idx]
  }));
}

function joinMarkupLines(lines) {
  let markup = '';
  let lastIdx = lines.length - 1;

  // Don't add back the new line character after highlighted lines
  // as they need to be display: block and full-width.
  lines.forEach((line, idx) => {
    markup += line.highlighted
      ? line.markup
      : `${line.markup}${idx === lastIdx ? '' : '\n'}`;
  });

  return markup;
}
