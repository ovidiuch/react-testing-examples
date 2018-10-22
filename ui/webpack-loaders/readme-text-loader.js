const unified = require('unified');
const remark = require('remark-parse');
const traverse = require('traverse');

module.exports = function parseReadme(source) {
  const tree = unified()
    .use(remark)
    .parse(source);

  const info = {
    title: getTitle(tree.children),
    body: getBody(tree.children)
  };

  return `module.exports = ${JSON.stringify(info)}`;
};

function getTitle(nodes) {
  const node = nodes.find(n => n.type === 'heading' && n.depth === 2);
  if (!node || !node.children[0]) {
    return '';
  }

  return node.children[0].value;
}

function getBody(nodes) {
  return traverse.reduce(
    nodes,
    (ps, node) => {
      return isParagraphNode(node) ? [...ps, getParagraphText(node)] : ps;
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

function isParagraphNode(node) {
  return node && node.type === 'paragraph';
}

function isTextNode(node) {
  return node && TEXT_NODES.indexOf(node.type) !== -1;
}
