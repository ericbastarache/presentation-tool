import { combineReducers } from 'redux'
import presentationReducer from './presentation'
import slidebarReducer from './slidebar'
import toolbarReducer from './toolbar'

const rootReducer = combineReducers({
  presentation: presentationReducer,
  slidebar: slidebarReducer,
  toolbar: toolbarReducer
});

export default rootReducer;