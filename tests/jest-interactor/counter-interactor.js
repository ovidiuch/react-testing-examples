import { interactor, text, clickable } from '@bigtest/interactor';

// A reusable interactor for the xhr, fetch, and redux counter tests
@interactor class CounterInteractor {
  clickedText = text();
  increment = clickable('button');
}

export default CounterInteractor;
