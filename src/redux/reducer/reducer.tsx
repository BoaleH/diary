import { combineReducers } from 'redux';
// 引入其他reducer
import CommonReducer from './CommonReducer';

// 将所有引入的reducer合并成一个reducers,暴露出去
export default combineReducers({
  CommonReducer,
});