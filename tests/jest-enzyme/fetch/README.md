## Fetch requests

The component reads and updates a server counter using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

We test that the component renders the counter value from the mocked API response. Then we click on the increment button, which makes a POST request to increment the counter, and afterwards test that the component renders the incremented value.

> These tests are **async** because server requests don't resolve immediately. We wait for the button to appear before interacting with our component.

> We use [`@react-mock/fetch`](https://github.com/skidding/react-mock/tree/master/packages/fetch) to mock the server requests and [`async-retry`](https://github.com/skidding/async-retry) for assertions that take some time to come true.
