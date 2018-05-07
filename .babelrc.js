let inlineImportOpts = {
  extensions: ['.png', '.svg']
};

module.exports = {
  presets: ['next/babel', '@babel/preset-flow'],
  plugins: [['babel-plugin-inline-import-data-uri', inlineImportOpts]],
  env: {
    test: {
      presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }]]
    }
  }
};
