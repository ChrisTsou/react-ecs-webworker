//setTimeout limits its delay at 4ms minimum, lower values become 4ms
const TARGET_FRAME_TIME = 4; //ms

const limitFrameRate = (frameTime: number, callNextFrame: Function) => {
  if (frameTime < TARGET_FRAME_TIME) {
    setTimeout(() => {
      callNextFrame();
    }, TARGET_FRAME_TIME - frameTime);
  } else {
    callNextFrame();
  }
};

export default limitFrameRate;
