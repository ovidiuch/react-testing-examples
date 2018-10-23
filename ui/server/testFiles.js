// XXX: File uses CJS exports to be require-able by Next.js config
const { join } = require('path');
const glob = require('glob');

const TESTS_PATH = join(__dirname, `../../tests`);

exports.getTestKindIds = function() {
  return getDirNames(TESTS_PATH).filter(t => t !== 'shared');
};

exports.getTestNames = function(testKindId) {
  return getDirNames(join(TESTS_PATH, testKindId));
};

function getDirNames(dirPath) {
  return (
    glob
      .sync(`*/`, { cwd: dirPath })
      // Remove trailing slash
      .map(t => t.replace(/\/$/, ''))
  );
}
