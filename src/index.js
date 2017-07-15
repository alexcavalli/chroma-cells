import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './appRedux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(reducer);

const AppWithStore = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(AppWithStore, document.getElementById('root'));
registerServiceWorker();
