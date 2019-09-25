import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_NEW_SLIDE,
  GET_NEW_PRESENTATION,
  GET_TEMP_PRESENTATIONS,
  LOAD_PRESENTATIONS,
  GET_PRESENTATIONS,
  CREATE_SLIDE,
  CREATE_PRESENTATION,
  UPDATE_SLIDE,
  SAVE_SLIDE,
  REQUEST_DELETE_SLIDE,
  DELETE_SLIDE
}from '../types'
import * as Api from './api'

export function* watchGetTempPresentations() {
  yield takeLatest(GET_TEMP_PRESENTATIONS, getTempPresentations)
}

export function* watchGetPresentations() {
  yield takeLatest(GET_PRESENTATIONS, requestPresentations)
}

export function* watchPresentationCreation() {
  yield takeLatest(GET_NEW_PRESENTATION, requestNewPresentation)
}

export function* watchSlideCreation() {
  yield takeLatest(GET_NEW_SLIDE, requestNewSlide)
}

export function* watchSlideUpdate() {
  yield takeLatest(UPDATE_SLIDE, updateSlide)
}

export function* watchRequestDeleteSlide() {
  yield takeLatest(REQUEST_DELETE_SLIDE, requestDeleteSlide)
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

export function* getTempPresentations(action) {
  try {
    const { token } = action
    const presentations = yield call(() => Api.getTempPresentations(token))
    yield put({ type: LOAD_PRESENTATIONS, presentations });
  } catch (error) {
    throw error
  }
}

export function* requestPresentations(action) {
  try {
    const { token } = action
    const presentations = yield call(() => Api.getTempPresentations(token))
    yield put({ type: LOAD_PRESENTATIONS, presentations });
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
    const {token, slideID, presentationID, data, canvasDimensions, thumbnail} = action
    yield call(() => Api.updateSlide(token, slideID, presentationID, data, canvasDimensions));
    yield put({ type: SAVE_SLIDE, slideID, presentationID, data, canvasDimensions, thumbnail});
  } catch (error) {
    throw error
  }
}

export function* requestDeleteSlide(action) {
  try {
    const {token, slideID, presentationID} = action
    yield call(() => Api.deleteSlide(token, slideID, presentationID));
    yield put({ type: DELETE_SLIDE });
  } catch (error) {
    throw error
  }
}