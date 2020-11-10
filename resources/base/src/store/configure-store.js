import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import rootReducers from "./reducers";

const enhancer = applyMiddleware(thunk);
const storeEnhancer =
  process.env.NODE_ENV === "production"
    ? enhancer
    : composeWithDevTools(enhancer);

// Configure the store
function configureStore(initialReducer) {
  const store = createStore(combineReducers(initialReducer), storeEnhancer);
  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {
    ...initialReducer
  };

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
      return;
    }
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(combineReducers({ ...store.asyncReducers }));
  };

  // Return the modified store
  return store;
}

export const store = configureStore(rootReducers);
