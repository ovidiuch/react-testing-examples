// highlight{11-13}
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { themeLight } from 'shared/theme';
import { HelloMessageStyled } from 'shared/components/HelloMessageStyled';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ theme, name }) =>
  render(
    <ThemeProvider theme={theme}>
      <HelloMessageStyled name={name} />
    </ThemeProvider>
  );

it('renders greeting', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = getWrapper({ theme: themeLight, name: 'Maggie' });

  await waitForElement(() => getByText('Hello Maggie'));
});
