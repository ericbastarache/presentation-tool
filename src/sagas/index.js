import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield console.log('Hello World placeholder');
  yield all([
    // all the other root sagas from the other sagas files (not here yet)
  ]);
}

export default rootSaga;