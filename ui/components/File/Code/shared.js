// @flow

import Prism from 'prismjs';
import { parseCode } from '../shared';

type ExtractCodeLineArgs = {
  code: string,
  showComments: boolean,
  showImports: boolean
};

type CodeLine = {
  rawCode: string,
  coloredCode: string,
  isHidden: boolean,
  isHighlighted: boolean
};

export function extractCodeLines({
  code: rawCode,
  showComments,
  showImports
}: ExtractCodeLineArgs): CodeLine[] {
  const { lineNumsToHighlight, cleanCode: code } = parseCode(rawCode);

  const coloredCode = Prism.highlight(code, Prism.languages.jsx, 'jsx');
  const coloredLines = coloredCode.split('\n');

  const lines = code.split('\n').map((line, lineIndex) => ({
    rawCode: line,
    coloredCode: coloredLines[lineIndex],
    isHidden: isLineHidden({ code: line, showComments, showImports }),
    isHighlighted: isLineHighlighted({ lineIndex, lineNumsToHighlight })
  }));

  const firstVisibleLine = getFirstVisibleLine(lines);

  // Ensure the visible code doesn't start with an empty line. This can happen
  // when imports are hidden
  return isLineEmpty(firstVisibleLine)
    ? hideLine(lines, firstVisibleLine)
    : lines;
}

function getFirstVisibleLine(lines) {
  return lines.filter(l => !l.isHidden)[0];
}

function isLineEmpty(line) {
  return line && line.rawCode === '';
}

function hideLine(lines, line) {
  const lineIndex = lines.indexOf(line);

  return [
    ...lines.slice(0, lineIndex),
    { ...line, isHidden: true },
    ...lines.slice(lineIndex + 1)
  ];
}

function isLineHighlighted({ lineIndex, lineNumsToHighlight }) {
  // +1 line because lines start from 0 programatically, and +1 because we
  // remove the first line with the highlight{...} comment
  return lineNumsToHighlight.indexOf(lineIndex + 2) !== -1;
}

function isLineHidden({ code, showComments, showImports }) {
  return (
    (!showComments && isCommentLine(code)) ||
    (!showImports && isImportLine(code))
  );
}

function isImportLine(code) {
  return Boolean(code.match(/^import /));
}

function isCommentLine(code) {
  return Boolean(code.match(/^\s*\/\//));
}
