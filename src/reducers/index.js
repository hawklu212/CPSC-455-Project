import {combineReducers} from 'redux';
import directionsReducer from './directionsReducer'
import {template,drawerState, loginState} from './reducer'

const rootReducer = combineReducers({
drawerState,loginState, directionsReducer,
template
});

export default rootReducer;