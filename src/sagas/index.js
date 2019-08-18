import {
  all,
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import * as ActionTypes from '../types'

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function* rootSaga() {
  yield all([
    watchPresentationCreation()
  ])
}

function* watchPresentationCreation() {
  yield takeLatest(ActionTypes.GET_NEW_PRESENTATION, requestNewPresentation)
}

const getNewPresentation = () => {
  const data = fetch(process.env.REACT_APP_PRESENTATION_ENDPOINT + '/presentations/create', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      title: "Title",
      slides: [
        {data : null }
      ]
    })
  }).then(res => res.json()).catch(err => {
    throw err
  })
  return data
}

function* requestNewPresentation() {
  try {
    const presentation = yield call(getNewPresentation)
    yield put({ type: ActionTypes.CREATE_PRESENTATION, presentation });
  } catch (error) {
    throw new error
  }
}


export default rootSaga;