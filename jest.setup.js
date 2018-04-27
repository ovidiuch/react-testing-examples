// https://reactjs.org/docs/javascript-environment-requirements.html
global.requestAnimationFrame = cb => setTimeout(cb, 0);

// The rAF shim must be added before loading the Enzyme setup
require('./enzyme.setup');
