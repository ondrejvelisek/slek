import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import {state} from './components/state';
import {ChatContainer} from './containers/chat/Chat';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {LoginContainer} from './containers/chat/Login';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  rootReducer,
  state,
  composeEnhancers(applyMiddleware(...middleware))
);

export class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ChatContainer}/>
            <Route path="/login" component={LoginContainer}/>
            {/*<Route path="/profile" component={ProfileContainer}/>*/}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
