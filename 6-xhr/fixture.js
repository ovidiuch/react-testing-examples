// highlight{4,6-15,19}
import { ServerCounter } from './component';

let count = 5;

let mockGet = {
  url: '/count',
  method: 'GET',
  response: (req, res) => res.status(200).body({ count })
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
