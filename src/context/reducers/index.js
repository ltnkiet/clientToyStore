import {combineReducers} from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import categoryReducer from './categoryReducer'

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  category: categoryReducer
})

export default myReducers;