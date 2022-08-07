import { combineReducers } from "redux";
import directionsReducer from "./directionsReducer";
import routeIndexReducer from "./routeIndexReducer";
import savedRoutesReducer from "./savedRoutesReducer";
import { template, drawerState, loginState } from "./reducer";

const rootReducer = combineReducers({
  drawerState,
  loginState,
  directionsReducer,
  routeIndexReducer,
  savedRoutesReducer,
  template,
});

export default rootReducer;
