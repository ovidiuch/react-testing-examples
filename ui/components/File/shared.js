// @flow

import rangeParser from 'parse-numeric-range';

type ParsedCode = {
  lineNumsToHighlight: number[],
  cleanCode: string
};

export function parseCode(code: string): ParsedCode {
  // The highlight line numbers comments is (optionally) found in the first
  // line of a code sample. The comment like this: highlight{2-3,12-13}
  const lineNumsToHighlight = getHighlightLines(code);
  const cleanCode =
    lineNumsToHighlight.length > 0 ? stripFirstLine(code) : code;

  return { lineNumsToHighlight, cleanCode };
}

function getHighlightLines(code) {
  const res = code.match(/highlight\{(.+?)\}/);

  return res ? rangeParser.parse(res[1]) : [];
}

function stripFirstLine(code) {
  return code.replace(/^.+?\n/, '');
}
