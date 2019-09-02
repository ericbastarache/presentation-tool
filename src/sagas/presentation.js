import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_NEW_SLIDE,
  GET_NEW_PRESENTATION,
  GET_NEW_TEMP_PRESENTATION,
  LOAD_TEMP_PRESENTATIONS,
  LOAD_PRESENTATIONS,
  GET_PRESENTATIONS,
  CREATE_SLIDE,
  CREATE_PRESENTATION,
  UPDATE_SLIDE,
  SAVE_SLIDE
}from '../types'
import * as Api from './api'

export function* watchTempPresentationCreation() {
  yield takeLatest(GET_NEW_TEMP_PRESENTATION, requestNewTempPresentation)
}

export function* watchLoadTempPresentations() {
  yield takeLatest(LOAD_TEMP_PRESENTATIONS, requestTempPresentations)
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

export function* requestNewSlide(action) {
  try {
    yield call(() => Api.getNewSlide(action.presentationID))
    const slide = yield call(() => Api.getLastSlide(action.presentationID))
    yield put({ type: CREATE_SLIDE, slide});
  } catch (error) {
    throw error
  }
}

export function* requestNewTempPresentation(action) {
  try {
    const { userID } = action
    const presentation = yield call(() => Api.getNewTempPresentation(userID))
    yield put({ type: CREATE_PRESENTATION, presentation });
  } catch (error) {
    throw error
  }
}

export function* requestTempPresentations(action) {
  try {
    const { userID } = action
    const presentations = yield call(() => Api.getTempPresentations(userID))
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
    const {slideID, presentationID, data, canvasDimensions} = action
    yield call(() => Api.updateSlide(slideID, presentationID, data, canvasDimensions));
    yield put({ type: SAVE_SLIDE, slideID, presentationID, data, canvasDimensions});
  } catch (error) {
    throw error
  }
}