import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import presentationReducer from './presentation'
import toolbarReducer from './toolbar'
import userReducer from './user'

const rootReducer = (history) => combineReducers({
  presentation: presentationReducer,
  toolbar: toolbarReducer,
  user: userReducer,
  router: connectRouter(history)
});

export default rootReducer;