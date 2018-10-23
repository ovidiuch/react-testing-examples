## Contributing guide

First make sure you understand [what these examples focus on](https://github.com/skidding/react-testing-examples/blob/master/WHATSTHIS.md#whats-the-focus). Then make the examples as **concise** as possible. Finally, try to communicate your intentions.

### How to add a test

Here are the required steps for adding a _foobar_ example in the `jest-enzyme` collection.

- Put test(s) in `tests/jest-enzyme/foobar/test.js`
- Put description in `tests/jest-enzyme/foobar/README.md`

Get inspired from existing examples.

### How to add a test collection (ie. a new toolchain)

> This one's a big deal so you want to start a conversation before jumping into it.

Copy one of the dirs from [tests](tests) (eg. `jest-rtl`) to get started. You don't have to mirror tests from existing collections. At least one test example is enough to create a new collection.

A few more steps required before deploying a new collection:

- Add a label [here](https://github.com/skidding/react-testing-examples/blob/bd01b2e8a2a5f9fd7446e781f2026e191326afcf/ui/shared/testKinds.js#L8-L9)
- Add test commands [here](https://github.com/skidding/react-testing-examples/blob/master/package.json#L4-L7)
