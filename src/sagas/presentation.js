import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_NEW_SLIDE,
  GET_NEW_PRESENTATION,
  CREATE_SLIDE,
  CREATE_PRESENTATION
}from '../types'
import * as Api from './api'

export function* watchPresentationCreation() {
  yield takeLatest(GET_NEW_PRESENTATION, requestNewPresentation)
}

export function* watchSlideCreation() {
  yield takeLatest(GET_NEW_SLIDE, requestNewSlide)
}

export function* requestNewSlide(action) {
  try {
    const presentation = yield call(() => Api.getNewSlide(action.presentationID))
    yield put({ type: CREATE_SLIDE, presentation});
  } catch (error) {
    throw error
  }
}

export function* requestNewPresentation() {
  try {
    const presentation = yield call(Api.getNewPresentation)
    yield put({ type: CREATE_PRESENTATION, presentation });
  } catch (error) {
    throw error
  }
}