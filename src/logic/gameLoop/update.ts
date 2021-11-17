const update = (lastFrameTime, input, state) => {
  let newState = {};

  const newCounter = state.counter + 1 * (lastFrameTime / 1000);
  newState = { ...newState, counter: newCounter };

  return newState;
};

export default update;
