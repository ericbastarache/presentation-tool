import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_NEW_SLIDE,
  GET_NEW_PRESENTATION,
  CREATE_SLIDE,
  CREATE_PRESENTATION,
  UPDATE_SLIDE,
  SAVE_SLIDE
}from '../types'
import * as Api from './api'

export function* watchPresentationCreation() {
  yield takeLatest(GET_NEW_PRESENTATION, requestNewPresentation)
}

export function* watchSlideCreation() {
  yield takeLatest(GET_NEW_SLIDE, requestNewSlide)
}

export function* watchSlideUpdate() {
  yield takeLatest(UPDATE_SLIDE, updateSlide)
}

export function* requestNewSlide(action) {
  try {
    yield call(() => Api.getNewSlide(action.presentationID))
    const slide = yield call(() => Api.getLastSlide(action.presentationID))
    yield put({ type: CREATE_SLIDE, slide});
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

export function* updateSlide(action) {
  try {
    const {slideID, presentationID, data, thumbnail, canvasDimensions} = action
    yield call(() => Api.updateSlide(slideID, presentationID, data, thumbnail, canvasDimensions))
    yield put({ type: SAVE_SLIDE, slideID, presentationID, data, thumbnail, canvasDimensions});
  } catch (error) {
    throw error
  }
}