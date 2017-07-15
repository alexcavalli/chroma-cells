import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './appRedux';
const store = createStore(reducer);

const AppWithStore = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(AppWithStore, document.getElementById('root'));
registerServiceWorker();
