// Importing 'prismjs/components/prism-jsx' loads the jsx Prism language, but
// it only works if we import 'prismjs' first
import 'prismjs';
import 'prismjs/components/prism-jsx';
import { injectGlobal } from 'styled-components';

// TODO: Copy styles from https://reactjs.org/docs/context.html#provider
injectGlobal`
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
  }

  pre, code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace !important;
  }

  .gatsby-highlight{background:#282c34;color:#ffffff;border-radius:10px;overflow:auto;tab-size:1.5em;-moz-tab-size:1.5em;}
.gatsby-highlight code[class*="gatsby-code-"],
.gatsby-highlight pre[class*="gatsby-code-"],
.gatsby-highlight pre.prism-code{height:auto !important;margin:1rem;font-size:14px;line-height:20px;white-space:pre-wrap;word-break:break-word;}.gatsby-highlight + .gatsby-highlight{margin-top:20px;}.gatsby-highlight-code-line{background-color:#14161a;display:block;margin:-0.125rem calc(-1rem - 15px);padding:0.125rem calc(1rem + 15px);}.token.attr-name{color:#c5a5c5;}
.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata{color:#999999;}
.token.property,
.token.number,
.token.function-name,
.token.constant,
.token.symbol,
.token.deleted{color:#5a9bcf;}.token.boolean{color:#ff8b50;}.token.tag{color:#fc929e;}.token.string{color:#8dc891;}.token.punctuation{color:#5FB3B3;}
.token.selector,
.token.char,
.token.builtin,
.token.inserted{color:#D8DEE9;}.token.function{color:#79b6f2;}
.token.operator,
.token.entity,
.token.url,
.token.variable{color:#d7deea;}.token.attr-value{color:#8dc891;}.token.keyword{color:#c5a5c5;}
.token.atrule,
.token.class-name{color:#FAC863;}.token.important{font-weight:400;}.token.bold{font-weight:700;}.token.italic{font-style:italic;}.token.entity{cursor:help;}.namespace{opacity:0.7;}
`;
