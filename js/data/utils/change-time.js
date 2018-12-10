export default (state) => {
  if (!state.time) {
    return state;
  }

  return Object.assign({}, state, {time: state.time - 1});
};
