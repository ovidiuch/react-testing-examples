const { existsSync } = require('fs');
const { join } = require('path');
const glob = require('glob');
const { execSync } = require('child_process');

module.exports = function parseReadme(source) {
  let tests = getTestDirs()
    .map(getTestObj)
    .join(',');
  let gitRef = getLastCommit();

  return source
    .replace('tests = []', `tests = [${tests}]`)
    .replace(`gitRef = ''`, `gitRef = '${gitRef}'`);
};

function getTestDirs() {
  // Hmm, maybe put tests in a dedicated dir...
  return glob.sync('./[0-9]*/').map(p => p.replace(/^\.\/(.+)\/$/, '$1'));
}

function getTestObj(name) {
  let readmeTextLoader = getLoaderPath('readme-text-loader');

  return `{
    name: '${name}',
    readme: {
      text: require('!${readmeTextLoader}!${getFilePath(name, '/README.md')}'),
      markup: require('${getFilePath(name, '/README.md')}').default
    },
    code: {
      component: require('!raw-loader!${getFilePath(name, '/component')}'),
      enzyme: {
        test: require('!raw-loader!${getFilePath(name, '/enzyme.test')}')
      },
      cosmos: {
        test: require('!raw-loader!${getFilePath(name, '/cosmos.test')}'),
        fixture: require('!raw-loader!${getFilePath(name, '/fixture')}'),
        proxies: ${getProxiesReq(name)}
      }
    }
  }`;
}

function getProxiesReq(testName) {
  let proxiesPath = getFilePath(testName, 'cosmos.proxies.js');

  return existsSync(proxiesPath)
    ? `require('!raw-loader!${proxiesPath}')`
    : 'undefined';
}

function getFilePath(testName, filePath) {
  return join(__dirname, `../../${testName}/${filePath}`);
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
