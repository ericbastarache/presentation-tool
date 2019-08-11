import { combineReducers } from 'redux'
import presentationReducer from './presentation'
import toolbarReducer from './toolbar'

const rootReducer = combineReducers({
  presentation: presentationReducer,
  toolbar: toolbarReducer
});

export default rootReducer;