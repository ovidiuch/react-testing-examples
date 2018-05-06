## React Router load and change URL

The component is connected to [React Router](https://github.com/ReactTraining/react-router). It renders a variable text containing a URL parameter, as well as a `Link` to another location.

First we make sure the component renders a param from the initial URL. Then we check that upon clicking on the Link element, the URL param from the new location is rendered, which proves that the page has successfully routed.

> Alternatively, we could just test the `to` prop of the Link element. That's also fine, but this test is closer to how a user thinks. Eg. "Click on a link, the page behind that link is rendered." This type of thinking makes tests more resilient against implementation changes, like upgrading the router library to a new API.
