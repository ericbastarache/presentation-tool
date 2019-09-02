import {
  all
} from 'redux-saga/effects';
import { 
  watchPresentationCreation,
  watchTempPresentationCreation,
  watchLoadTempPresentations,
  watchGetPresentations,
  watchSlideCreation,
  watchSlideUpdate,
} from 'sagas/presentation';

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchTempPresentationCreation(),
    watchLoadTempPresentations(),
    watchGetPresentations(),
    watchSlideCreation(),
    watchSlideUpdate()
  ])
}


export default rootSaga;