import {
  all
} from 'redux-saga/effects';
import { 
  watchPresentationCreation,
  watchSlideCreation,
  watchSlideUpdate
} from 'sagas/presentation';

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchSlideCreation(),
    watchSlideUpdate()
  ])
}


export default rootSaga;