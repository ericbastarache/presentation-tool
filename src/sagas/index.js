import {
  all
} from 'redux-saga/effects';
import { 
  watchPresentationCreation,
  watchTempPresentationCreation,
  watchLoadTempPresentations,
  watchSlideCreation,
  watchSlideUpdate
} from 'sagas/presentation';

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchTempPresentationCreation(),
    watchLoadTempPresentations(),
    watchSlideCreation(),
    watchSlideUpdate()
  ])
}


export default rootSaga;