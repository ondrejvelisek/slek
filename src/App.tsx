import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducer } from './reducers/rootReducer';
import {state} from './components/state';
import {ChatContainer} from './containers/chat/Chat';
import {Route, Switch} from 'react-router-dom';
import {LoginContainer} from './containers/chat/Login';
import createBrowserHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';

const history = createBrowserHistory();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, routerMiddleware(history)];

const rootReducer = createRootReducer(history);

const store = createStore(
  rootReducer,
  state,
  composeEnhancers(applyMiddleware(...middleware))
);

export class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={ChatContainer}/>
            <Route path="/login" component={LoginContainer}/>
            {/*<Route path="/profile" component={ProfileContainer}/>*/}
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
