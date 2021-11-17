import { globalState } from '../main';

function App() {
  const fps = globalState.useSelector((state) => state.fps);
  const counter = globalState.useSelector((state) => state.gameState.counter);

  return (
    <>
      <div>{`Worker Fps: ${fps}`}</div>
      <div>{`counter: ${counter}`}</div>
    </>
  );
}

export default App;
