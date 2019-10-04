import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';
import { saveState, persistedState } from "./persisted.store";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  middlewareEnhancer = applyMiddleware(thunk),
  composedEnhancers = composeEnhancer(middlewareEnhancer);

const store = createStore(
  reducers,
  persistedState,
  composedEnhancers
);

// Checking Saving User data if not available in storage
store.subscribe(() => {
  saveState(store.getState())
})

export default store;