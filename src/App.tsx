import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import {ChatPage} from './components/chat/ChatPage';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
));

export class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ChatPage/>
      </Provider>
    );
  }
}
