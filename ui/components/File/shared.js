// @flow

import rangeParser from 'parse-numeric-range';

export function parseCode(
  code: string
): { highlightLines: number[], cleanCode: string } {
  // The highlight lines comment takes up the first line and is optional. Eg.
  //   highlight{2-3,12-13}
  const highlightLines = getHighlightLines(code);
  const cleanCode = highlightLines.length > 0 ? stripFirstLine(code) : code;

  return { highlightLines, cleanCode };
}

function getHighlightLines(code) {
  const res = matchHighlightComment(code);

  return res ? rangeParser.parse(res[1]) : [];
}

function matchHighlightComment(code) {
  return code.match(/highlight\{(.+?)\}/);
}

function stripFirstLine(code) {
  return code.replace(/^.+?\n/, '');
}
