// highlight{11-13}
import React from 'react';
import { mount } from '@bigtest/react';
import { themeLight } from 'shared/theme';
import { interactor } from '@bigtest/interactor';
import { ThemeProvider } from 'styled-components';
import { HelloMessageStyled } from 'shared/components/HelloMessageStyled';

@interactor
class HelloMessageInteractor {
  // Custom interactions
}

// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = ({ theme, name }) =>
  mount(() => (
    <ThemeProvider theme={theme}>
      <HelloMessageStyled name={name} />
    </ThemeProvider>
  ));

const helloMessage = new HelloMessageInteractor('span');

it('renders greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await renderComponent({ theme: themeLight, name: 'Maggie' });

  //TODO also test the proper theme has been applied
  await helloMessage.when(() =>
    expect(helloMessage.text).toEqual('Hello Maggie')
  );
});
