// highlight{11-13}
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { themeLight } from 'shared/theme';
import { HelloMessageStyled } from 'shared/components/HelloMessageStyled';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ theme, name }) =>
  mount(
    <ThemeProvider theme={theme}>
      <HelloMessageStyled name={name} />
    </ThemeProvider>
  );

it('renders greeting', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ theme: themeLight, name: 'Maggie' });

  expect(wrapper.text()).toMatch('Hello Maggie');
});
