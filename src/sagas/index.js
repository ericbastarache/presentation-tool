import {
  all
} from 'redux-saga/effects';
import { 
  watchPresentationCreation,
  watchGetTempPresentations,
  watchGetPresentations,
  watchSlideCreation,
  watchSlideUpdate,
} from 'sagas/presentation';

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchGetTempPresentations(),
    watchGetPresentations(),
    watchSlideCreation(),
    watchSlideUpdate()
  ])
}


export default rootSaga;