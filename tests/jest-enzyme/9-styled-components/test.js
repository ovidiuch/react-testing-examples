// highlight{11-13}
import React from 'react';
import { create as mount } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { themeLight, themeDark } from './theme';
import { HelloMessageStyled } from 'shared/components/HelloMessageStyled';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ theme }) =>
  mount(
    <ThemeProvider theme={theme}>
      <HelloMessageStyled>Hello world!</HelloMessageStyled>
    </ThemeProvider>
  );

it('renders "light" theme', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ theme: themeLight });

  expect(wrapper.toJSON()).toMatchSnapshot();
});

it('renders "dark" theme', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ theme: themeDark });

  expect(wrapper.toJSON()).toMatchSnapshot();
});
