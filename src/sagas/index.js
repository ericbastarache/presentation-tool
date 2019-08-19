import {
  all,
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import * as ActionTypes from '../types'
import * as Api from './api'

function* rootSaga() {
  yield all([
    watchPresentationCreation(),
    watchSlideCreation()
  ])
}

function* watchPresentationCreation() {
  yield takeLatest(ActionTypes.GET_NEW_PRESENTATION, requestNewPresentation)
}

function* watchSlideCreation() {
  yield takeLatest(ActionTypes.GET_NEW_SLIDE, requestNewSlide)
}

function* requestNewSlide(action) {
  try {
    const presentation = yield call(() => Api.getNewSlide(action.presentationID))
    yield put({ type: ActionTypes.CREATE_SLIDE, presentation});
  } catch (error) {
    throw error
  }
}

function* requestNewPresentation() {
  try {
    const presentation = yield call(Api.getNewPresentation)
    yield put({ type: ActionTypes.CREATE_PRESENTATION, presentation });
  } catch (error) {
    throw error
  }
}


export default rootSaga;