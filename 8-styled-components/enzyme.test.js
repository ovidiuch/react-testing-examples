// highlight{9-13}
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { themeLight, themeDark } from './theme';
import { HelloMessage } from './component';

function getClassName(theme) {
  let wrapper = mount(
    <ThemeProvider theme={theme}>
      <HelloMessage>Hello world!</HelloMessage>
    </ThemeProvider>
  );

  return wrapper
    .find(HelloMessage)
    .find('span')
    .prop('className');
}

it('changes styles with theme', () => {
  expect(getClassName(themeLight)).not.toEqual(getClassName(themeDark));
});
