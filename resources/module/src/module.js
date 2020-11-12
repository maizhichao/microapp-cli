import Main from "./components/main";
import reducers from "./reducers";
import { store } from "@microapp/{MICROAPP_BASE_MODULE_NAME}";

store.injectReducer("{MICROAPP_CHILD_MODULE_REDUX_KEY}", reducers);

export default Main;
