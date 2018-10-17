// @flow

import delay from 'delay';

export function delayed<T>(val: T): Promise<T> {
  return new Promise(async resolve => {
    await delay(200);
    resolve(val);
  });
}
