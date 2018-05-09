// highlight{5,7-20,24}
import delay from 'delay';
import { ServerCounter } from './component';

let count = 5;

let mockGet = {
  url: '/count',
  method: 'GET',
  response: async (req, res) => {
    // Simulate 0.2s delay
    await delay(200);
    return res.status(200).body({ count });
  }
};
let mockPost = {
  url: '/count',
  method: 'POST',
  response: (req, res) => res.status(200).body({ count: ++count })
};

export default {
  component: ServerCounter,
  xhr: [mockGet, mockPost]
};
