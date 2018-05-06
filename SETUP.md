## Setup

React requires a `requestAnimationFrame` polyfill to run in Jest. Enzyme needs to be configured with [an adapter](https://github.com/airbnb/enzyme/tree/master/packages) that matches your React version.

> Configs get hairy in time, but this is the minimal setup required to get things running with React and Enzyme inside Jest. All tests examples below run using these exact config files.
