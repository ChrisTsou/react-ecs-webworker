import React from 'react';
import ReactDOM from 'react-dom';
import { newRidgeState } from 'react-ridge-state';

import './index.css';
import App from './render/App';
import initialState from './logic/gameLoop/initialState';

export const globalState = newRidgeState(initialState);

const webWorker = new Worker('/src/logic/main.worker.ts', { type: 'module' });
webWorker.onmessage = ({ data }) => {
  globalState.set(data);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
