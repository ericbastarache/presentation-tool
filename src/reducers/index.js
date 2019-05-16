import { combineReducers } from 'redux';
import presentationReducer from 'components/Presentation/reducer';

const rootReducer = combineReducers({
  presentation: presentationReducer,
});

export default rootReducer;