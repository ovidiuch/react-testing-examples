## Local component state

The component reads and updates a counter from its [local state](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class).

We test that the component renders the counter value. Then we click on the increment button, which updates the local state, and test that the component now renders the incremented value.

> We use [`@react-mock/state`](https://github.com/skidding/react-mock#component-state) to mock the component state.
