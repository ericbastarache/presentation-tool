import {
  all
} from 'redux-saga/effects';
import { 
  watchPresentationCreation,
  watchSlideCreation 
} from 'sagas/presentation';

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchSlideCreation()
  ])
}


export default rootSaga;