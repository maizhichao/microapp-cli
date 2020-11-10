import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import reducers from "./reducers";

const enhancer = composeWithDevTools(applyMiddleware(thunk));
export default function configureStore() {
  return createStore(reducers, enhancer);
}
