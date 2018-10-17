## XHR requests

The component reads and updates a server counter using the [XHR API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

We test that the component renders the `count` value from the mocked API response.

Then we click on the increment button, which makes a POST request to increment the counter, and afterwards test that the component renders the incremented value.

> These tests are **async** because server requests don't resolve immediately. We wait for the loading message to disappear before interacting with our component.

> We also use `await retry()` for assertions that take some time to come true.
