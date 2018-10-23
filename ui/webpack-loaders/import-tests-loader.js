const { join } = require('path');
const glob = require('glob');
const { execSync } = require('child_process');
const { getTestKindIds, getTestNames } = require('../server/testFiles');

const TESTS_PATH = join(__dirname, `../../tests`);

module.exports = function parseReadme(source) {
  const testKindsStr = getTestKindIds().map(testKindId =>
    getTestKindStr(testKindId)
  );

  const gitRef = getLastCommit();

  // Re-build webpack bundle on test file changes
  this.addContextDependency(TESTS_PATH);

  return source
    .replace(
      'testKinds: TTestKinds = {}',
      `testKinds: TTestKinds = {
  ${testKindsStr.join(`,\n `)}
}`
    )
    .replace(`gitRef: string = ''`, `gitRef = '${gitRef}'`);
};

function getTestKindStr(testKindId) {
  return `'${testKindId}': {
    id: '${testKindId}',
    order: require('${getOrderPath(testKindId)}').default,
    setup: ${getSetupStr(testKindId)},
    tests: [${getTestNames(testKindId)
      .map(testName => getTestStr(testKindId, testName))
      .join(`, `)}]
  }`;
}

function getSetupStr(testKindId) {
  const readmePath = getSetupPath(testKindId, 'README.md');

  return getSectionStr({
    name: 'setup',
    readmePath,
    files: glob
      .sync(`*.js`, { cwd: getTestKindRootPath(testKindId) })
      .filter(p => ['order.js'].indexOf(p) === -1)
      .map(p => getSetupPath(testKindId, p))
  });
}

function getTestStr(testKindId, testName) {
  const readmePath = getTestFilePath(testKindId, testName, 'README.md');
  const testPath = getTestFilePath(testKindId, testName, 'test.js');

  return getSectionStr({
    name: testName,
    readmePath,
    files: [testPath]
  });
}

function getSectionStr({ name, readmePath, files }) {
  return `{
      name: '${name}',
      readme: ${getReadmeStr({ readmePath })},
      files: {
        ${files.map(filePath => getFileStr({ filePath })).join(`,\n        `)}
      }
    }`;
}

function getReadmeStr({ readmePath }) {
  const readmeTextLoader = getLoaderPath('readme-text-loader');

  return `{
        meta: require('!${readmeTextLoader}!${readmePath}'),
        component: require('${readmePath}').default
      }`;
}

function getFileStr({ filePath }) {
  const fileName = filePath.split('/').pop();

  return `'${fileName}': require('!raw-loader!${filePath}')`;
}

function getSetupPath(testKindId, filePath) {
  return join(getTestKindRootPath(testKindId), filePath);
}

function getTestFilePath(testKindId, testName, filePath) {
  return join(getTestKindRootPath(testKindId), testName, filePath);
}

function getOrderPath(testKindId) {
  return join(getTestKindRootPath(testKindId), 'order.js');
}

function getTestKindRootPath(testKindId) {
  return join(TESTS_PATH, testKindId);
}

function getLoaderPath(filePath) {
  return join(__dirname, `../webpack-loaders/${filePath}`);
}

function getLastCommit() {
  // Long live StackOverflow!
  return execSync(`git log | head -n 1 | awk '{print $2}'`)
    .toString()
    .trim();
}
