// highlight{12,16,18}
import React from 'react';
import { mount } from '@bigtest/react';
import Interactor from '@bigtest/interactor';
import { HelloMessage } from 'shared/components/HelloMessage';

let message = new Interactor();

it('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await mount(() => <HelloMessage name="Satoshi" />);

  await message.when(() => expect(message.text).toEqual('Hello Satoshi'));
});
