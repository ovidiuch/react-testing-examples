// @flow

import { match, score } from 'fuzzaldrin-plus';

import type { TInfo, TSection } from './types';

export function matchInfo({ title, description }: TInfo, searchText: string) {
  let searchTextNorm = normalizeTxt(searchText);

  return (
    match(title, searchText).length > 0 ||
    description.some(p => normalizeTxt(p).indexOf(searchTextNorm) !== -1)
  );
}

export function sortSections(sections: Array<TSection>, searchText: string) {
  let sorted: Array<TSection> = [...sections]
    .sort((a, b) => sortByDesc(b, searchText) - sortByDesc(a, searchText))
    .sort((a, b) => sortByTitle(b, searchText) - sortByTitle(a, searchText));

  return sorted;
}

function normalizeTxt(txt: string) {
  return txt.toLowerCase().replace(/\s/g, '');
}

function sortByTitle(section: TSection, searchText: string) {
  return sortBy(section, ({ title }) => score(title, searchText));
}

function sortByDesc(section: TSection, searchText: string) {
  return sortBy(section, ({ description }) =>
    Math.max(0, ...description.map(p => score(p, searchText)))
  );
}

function sortBy(section: TSection, cb: (info: TInfo) => number) {
  const { info } = section.type === 'setup' ? section.setup : section.test;

  return cb(info);
}
