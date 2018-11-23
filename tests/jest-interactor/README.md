## Setup

Minimal setup required to use [@bigtest/interactor](https://github.com/bigtestjs/interactor) with [Jest](https://jestjs.io/).

[Interactors](https://www.bigtestjs.io/docs/interactor/) define a part
of an app that tests act upon. They are immutable, reusable, and
composable. Which means you can write expressive tests that are fast,
robust, and match the composibility of the components you're testing.

Typically, when writing tests for your components, you will use a
custom interactor (like `counter-interactor.js` below). This allows
you to define all the ways someone _interacts_ with your
component. Can they type in it? Click it? Drag it? This is all done in
a way that doesn't tie you to a framework or implementation
details. Interactors are able to do that because they're _converging_
on the state of the DOM. They're not aware of your components
implentation, only what is reflected in the DOM.

If you don't need a custom interactor, you can import the `Interactor`
class and pass the selector of the element you want to interact with.

> All examples featured here run using these exact config files.
