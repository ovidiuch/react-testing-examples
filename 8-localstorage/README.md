## LocalStorage read and write

The component reads and updates the user name from [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage). We test that the component renders the mocked value from LocalStorage.

Then we type a new name into an input, submit the form, and test that the submitted value has been updated in LocalStorage.

> We use [`@react-mock/localstorage`](https://github.com/skidding/react-mock/tree/master/packages/localstorage) to mock the cached data.
