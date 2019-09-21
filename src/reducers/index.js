import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import presentationReducer from './presentation'
import userReducer from './user'

const rootReducer = (history) => combineReducers({
  presentation: presentationReducer,
  user: userReducer,
  router: connectRouter(history)
});

export default rootReducer;