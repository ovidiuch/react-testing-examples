// @flow
import rangeParser from 'parse-numeric-range';

export function getCleanCode(code: string) {
  let highlightLines = getHighlightLines(code);

  return highlightLines.length > 0
    ? getCodeWithoutHighlightComment(code)
    : code;
}

export function getHighlightLines(code: string): Array<number> {
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
