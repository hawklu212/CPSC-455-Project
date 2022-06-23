import {combineReducers} from 'redux';
import {template,drawerState, loginState} from './reducer'


const rootReducer = combineReducers({
drawerState,loginState, 
template
});

export default rootReducer;