## XHR requests

The component reads and updates a counter from the server via HTTP requests. The requests are made using the `XMLHttpRequest` API.

We test that the component renders the `count` value from the mocked API response.

Then we click on the increment button, which makes a POST request to increment the counter, and test that the component now renders the incremented value.

> This test is **async**, because server requests don't resolve immediately. We begin running data assertions as soon as the loading message is no longer rendered.
