import { combineReducers } from "redux";
import directionsReducer from "./directionsReducer";
import routeIndexReducer from "./routeIndexReducer";
import { template, drawerState, loginState } from "./reducer";

const rootReducer = combineReducers({
  drawerState,
  loginState,
  directionsReducer,
  routeIndexReducer,
  template,
});

export default rootReducer;
