
require.context('../public/', true);

// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';

import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import state from "./components/state";
import channelsReducer from "./reducers/channels";
import ChatPage from "./components/ChatPage";


const rootReducer = combineReducers({
  channels: channelsReducer
});

const store = createStore(
  rootReducer,
  state,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <ChatPage/>
  </Provider>,
  document.getElementById('app-root'));
