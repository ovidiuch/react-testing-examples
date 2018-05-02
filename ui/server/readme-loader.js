const unified = require('unified');
const remark = require('remark-parse');

module.exports = function parseReadme(source) {
  const tree = unified()
    .use(remark)
    .parse(source);

  return `module.exports = ${JSON.stringify({
    title: getHeading(tree.children),
    description: getDescription(tree.children)
  })}`;
};

function getHeading(nodes) {
  let node = nodes.find(n => n.type === 'heading' && n.depth === 2);
  if (!node || !node.children[0]) {
    return '';
  }

  return node.children[0].value;
}

function getDescription(nodes) {
  let ps = nodes.filter(n => n.type === 'paragraph');
  if (!ps.length) {
    return [];
  }

  return ps.map(c => c.children[0].value);
}
