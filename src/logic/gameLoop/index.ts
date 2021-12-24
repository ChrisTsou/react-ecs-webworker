import useSmoothedFpsCounter from '../utils/useSmoothedFpsCounter';
import initialState from './initialState';
import limitFrameRate from './limitFrameRate';
import update from './update';

const fpsCounter = useSmoothedFpsCounter();

function gameLoop(lastFrameTime = 0, state = initialState.gameState) {
  fpsCounter.startFrameMeasuring();

  //input
  let input = undefined;
  onmessage = ({ data }) => {
    input = data;
  };

  //update
  const newState = update(lastFrameTime, input, state);

  //will be called by limitFrameRate
  const callNextFrame = () => {
    //last moment work
    //send state to main thread
    //if message becomes slow use more advanced typeArray state for instant transfer
    postMessage({ fps: fpsCounter.getFps(), gameState: newState });

    gameLoop(fpsCounter.getFrameTime(), newState);
  };

  limitFrameRate(fpsCounter.getFrameTime(), callNextFrame);
}

export default gameLoop;
