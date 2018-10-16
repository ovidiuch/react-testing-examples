// @flow

import delay from 'delay';

export function delayed(val) {
  return new Promise(async resolve => {
    await delay(200);
    resolve(val);
  });
}
