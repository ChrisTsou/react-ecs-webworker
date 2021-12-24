//param: 0 < smoothing < 1
const useSmoothedFpsCounter = (smoothing = 0.8) => {
  let frameStartTime: number = 0;
  let previousFrameTimeAverage: number = 0;

  const startFrameMeasuring = () => {
    frameStartTime = performance.now();
  };

  const getFrameTime = () => {
    return performance.now() - frameStartTime;
  };

  const getFps = () => {
    const frameTime = performance.now() - frameStartTime;
    const newFrameTimeAverage =
      frameTime * smoothing + previousFrameTimeAverage * (1 - smoothing);

    previousFrameTimeAverage = newFrameTimeAverage;

    const fps = Math.round(1000 / newFrameTimeAverage);
    return fps;
  };

  return { startFrameMeasuring, getFrameTime, getFps };
};

export default useSmoothedFpsCounter;
