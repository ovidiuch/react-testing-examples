// @flow

import { match, score } from 'fuzzaldrin-plus';

import type { TReadmeText, TSection } from './types';

export function shouldSearch(searchText: string) {
  return searchText.length > 2;
}

export function matchReadmeText(
  { title, body }: TReadmeText,
  searchText: string
) {
  let searchTextNorm = normalizeTxt(searchText);

  return (
    match(title, searchText).length > 0 ||
    body.some(p => normalizeTxt(p).indexOf(searchTextNorm) !== -1)
  );
}

export function sortSections(sections: Array<TSection>, searchText: string) {
  let sorted: Array<TSection> = [...sections]
    .sort((a, b) => scoreByBody(b, searchText) - scoreByBody(a, searchText))
    .sort((a, b) => scoreByTitle(b, searchText) - scoreByTitle(a, searchText));

  return sorted;
}

function normalizeTxt(txt: string): string {
  return txt.toLowerCase().replace(/\s/g, '');
}

function scoreByTitle(section: TSection, searchText: string): number {
  return scoreBy(section, ({ title }) => score(title, searchText));
}

function scoreByBody(section: TSection, searchText: string): number {
  return scoreBy(section, ({ body }) =>
    Math.max(0, ...body.map(p => score(p, searchText)))
  );
}

function scoreBy(section: TSection, cb: (info: TReadmeText) => number): number {
  const { readme } = section.type === 'setup' ? section.setup : section.test;

  return cb(readme.text);
}
