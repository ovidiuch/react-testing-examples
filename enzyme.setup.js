import Enzyme from 'enzyme';
import AdapterReact16 from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new AdapterReact16() });
