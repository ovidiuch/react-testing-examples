## React Router load and change URL

The component is connected to [React Router](https://reacttraining.com/react-router/). It renders a variable text containing a URL parameter, as well as a `Link` to another location.

First we make sure the component renders a param from the initial URL. Then we check that the URL param from a new location is rendered upon clicking on the Link element, which proves that the page has successfully routed.

> Alternatively, we could just test the `to` prop of the Link element. That's also fine. But this test is closer to how a user thinks: _Click on a link. Did the linked page open?_

> This type of thinking makes tests more resilient against implementation changes, like upgrading the router library to a new API.
