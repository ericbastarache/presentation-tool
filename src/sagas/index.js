import {
  all
} from 'redux-saga/effects';
import { 
  watchPresentationCreation,
  watchGetTempPresentations,
  watchGetPresentations,
  watchSlideCreation,
  watchSlideUpdate,
  watchRequestDeleteSlide,
} from 'sagas/presentation';

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchGetTempPresentations(),
    watchGetPresentations(),
    watchSlideCreation(),
    watchSlideUpdate(),
    watchRequestDeleteSlide()
  ])
}


export default rootSaga;