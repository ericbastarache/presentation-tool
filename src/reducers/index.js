import { combineReducers } from 'redux'
import presentationReducer from './presentation'
import toolbarReducer from './toolbar'
import userReducer from './user'

const rootReducer = combineReducers({
  presentation: presentationReducer,
  toolbar: toolbarReducer,
  user: userReducer
});

export default rootReducer;