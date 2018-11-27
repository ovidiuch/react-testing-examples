// highlight{7,13,18-21}
import React from 'react';
import { Button } from 'shared/components/Button';
import Interactor from '@bigtest/interactor';
import { mount } from '@bigtest/react';

it('calls "onClick" prop on button click', async () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  // Mount the component in the DOM
  await mount(() => <Button onClick={onClick} />);

  // Use interactor `when` to assert the change has happened
  // this will loop until `true` & fails if it isn't true by
  // the timeout (2s by default)
  await new Interactor('button').click().when(() => {
    expect(onClick).toHaveBeenCalled();
  });
});
