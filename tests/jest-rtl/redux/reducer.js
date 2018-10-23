export function counterReducer(state = { count: 0 }, { type }) {
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
