import { configure } from 'enzyme';
import React16Adapter from 'enzyme-adapter-react-16';

// Enzyme requires a React version-specific adapter
// See https://github.com/airbnb/enzyme/tree/master/packages
configure({ adapter: new React16Adapter() });
