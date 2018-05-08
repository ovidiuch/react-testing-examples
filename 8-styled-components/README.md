## styled-components with theme

The component uses [styled-components](https://www.styled-components.com/) and builds its styles based on theme values. This means the component only works when wrapped inside the `ThemeProvider` context.

> **Note**: Comparing classes between themes is not a recommended way to test styles! Whether or not styles should be tested in any way is debatable. This example is merely demonstrates how to set up ThemeProvider in a test.
