import Immutable, { List } from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
  presentation: null,
  slides: List([{title: 'Title', subtitle: 'Subtitle', data:null}]),
});

const presentationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.push(action.payload)));
    case 'DELETE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.filter((slide, index) => index !== action.payload.key)));
    case 'SAVE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.map((slide, index) => {if (index === action.payload.key) slide.data = action.payload.data; return slide})));
    case 'LOAD_PRESENTATION':
      return state.merge(state, state.set('presentation', action.payload));
    default:
      return state;
  }
}

export default presentationReducer;