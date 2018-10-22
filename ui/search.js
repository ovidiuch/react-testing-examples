// @flow

import { match, score } from 'fuzzaldrin-plus';

import type { TReadmeMeta, TSection } from './types';

export function shouldSearch(searchText: string) {
  return searchText.length > 2;
}

export function matchReadmeText(
  { title, body }: TReadmeMeta,
  searchText: string
) {
  const searchTextNorm = normalizeTxt(searchText);

  return (
    match(title, searchText).length > 0 ||
    body.some(p => normalizeTxt(p).indexOf(searchTextNorm) !== -1)
  );
}

export function sortSections(sections: TSection[], searchText: string) {
  const sorted: Array<TSection> = [...sections]
    .sort((a, b) => scoreByBody(b, searchText) - scoreByBody(a, searchText))
    .sort((a, b) => scoreByTitle(b, searchText) - scoreByTitle(a, searchText));

  return sorted;
}

function normalizeTxt(txt: string): string {
  return txt.toLowerCase().replace(/\s/g, '');
}

function scoreByTitle(section: TSection, searchText: string): number {
  const { title } = section.readme.meta;

  return score(title, searchText);
}

function scoreByBody(section: TSection, searchText: string): number {
  const { body } = section.readme.meta;

  return Math.max(0, ...body.map(p => score(p, searchText)));
}
