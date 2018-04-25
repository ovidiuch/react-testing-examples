global.requestAnimationFrame = cb => setTimeout(cb, 0);

// We need to import this after requestAnimationFrame shim is added
require('./enzyme.setup');
