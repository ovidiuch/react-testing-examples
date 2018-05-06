const unified = require('unified');
const remark = require('remark-parse');
const traverse = require('traverse');

module.exports = function parseReadme(source) {
  let tree = unified()
    .use(remark)
    .parse(source);

  let info = {
    title: getTitle(tree.children),
    body: getBody(tree.children)
  };

  return `module.exports = ${JSON.stringify(info)}`;
};

function getTitle(nodes) {
  let node = nodes.find(n => n.type === 'heading' && n.depth === 2);
  if (!node || !node.children[0]) {
    return '';
  }

  return node.children[0].value;
}

function getBody(nodes) {
  return traverse.reduce(
    nodes,
    (ps, node) => {
      return node.type === 'paragraph' ? [...ps, getParagraphText(node)] : ps;
    },
    []
  );
}

function getParagraphText(node) {
  return traverse.reduce(
    node.children,
    (text, node) => (isTextNode(node) ? text + node.value : text),
    ''
  );
}

const TEXT_NODES = ['text', 'inlineCode'];

function isTextNode(node) {
  return TEXT_NODES.indexOf(node.type) !== -1;
}
