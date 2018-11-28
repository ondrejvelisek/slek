import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducer } from './reducers/rootReducer';
import {Route, Switch} from 'react-router-dom';
import {LoginContainer} from './containers/chat/Login';
import createBrowserHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';
import {IRootState} from './states/IRootState';
import {loadState, saveState} from './services/persistService';
import {createChatService} from './services/chatService';
import {ChatContainer} from './containers/chat/Chat';

const history = createBrowserHistory();

// TODO hacky, should be immutable
const services: any = {};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk.withExtraArgument(services), routerMiddleware(history)];

const rootReducer = createRootReducer(history);

const store = createStore(
  rootReducer,
  loadState(),
  composeEnhancers(applyMiddleware(...middleware))
);

services.chatService = createChatService(() => store.getState().chat.auth.content);

let currentState: IRootState;
store.subscribe(() => {
  const previousState: IRootState = currentState;
  currentState = store.getState();
  if (currentState && (!previousState || currentState.chat.auth !== previousState.chat.auth)) {
    saveState({ chat: { auth: currentState.chat.auth } });
  }
});

export class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={ChatContainer}/>
            {/*<Route path="/profile" component={ProfileContainer}/>*/}
            <Route path="/login" component={LoginContainer}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
