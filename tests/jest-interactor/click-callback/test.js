// highlight{12,17,19-22}
import React from 'react';
import { Button } from 'shared/components/Button';
import { interactor } from '@bigtest/interactor';
import { mount } from '@bigtest/react';

@interactor
class ButtonInteractor {
  // Add custom interactions
}

let button = new ButtonInteractor('button');

it('calls "onClick" prop on button click', async () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  await mount(() => <Button onClick={onClick} />);

  button.when(() => {
    expect(button.text).toEqual('Click me nao');
    expect(onClick).toHaveBeenCalled();
  });
});