// highlight{6-14}
import { ThemeProvider } from 'styled-components';
import { themeLight } from './theme';

// TODO: Publish official styled-components proxy
function StyledProxy(props) {
  let { nextProxy: { value: NextProxy, next }, fixture } = props;

  return (
    <ThemeProvider theme={fixture.theme || themeLight}>
      <NextProxy {...props} nextProxy={next()} />
    </ThemeProvider>
  );
}

export default [StyledProxy];
