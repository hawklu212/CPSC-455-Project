import { combineReducers } from "redux";
import directionsReducer from "./directionsReducer";
import routeIndexReducer from "./routeIndexReducer";
import savedRoutesReducer from "./savedRoutesReducer";
import displayRouteReducer from "./displayRouteReducer";
import { template, drawerState, loginState } from "./reducer";

const rootReducer = combineReducers({
  drawerState,
  loginState,
  directionsReducer,
  routeIndexReducer,
  savedRoutesReducer,
  displayRouteReducer,
  template,
});

export default rootReducer;
