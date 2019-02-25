const testSharedAlias = {
  root: ['./tests'],
  alias: {
    shared: './tests/shared'
  }
};

module.exports = {
  presets: ['next/babel', '@babel/preset-flow'],
  plugins: [
    ['babel-plugin-inline-import-data-uri', { extensions: ['.png', '.svg'] }],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    ['module-resolver', testSharedAlias],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]
  ],
  env: {
    test: {
      // Jest runs in Node and needs CommonJS modules. So does SSR, but Next
      // runs webpack on the server as well nowadays
      presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }]]
    }
  }
};
