## XHR requests

The component reads and updates a server counter using the [XHR API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

We test that the component renders the counter value from the mocked API response. Then we click on the increment button, which makes a POST request to increment the counter, and afterwards test that the component renders the incremented value.

> These tests are **async** because server requests don't resolve immediately. We wait for the button to appear before interacting with our component.

> We use [`@react-mock/xhr`](https://github.com/skidding/react-mock/tree/master/packages/xhr) to mock the server requests.
