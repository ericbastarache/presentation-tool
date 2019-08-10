import Immutable, { List } from 'immutable';
import {
  uniqid
} from 'lib/helpers';

const initial_active_slide = uniqid();
const initial_active_presentation = uniqid();

const INITIAL_STATE = Immutable.fromJS({
  active_presentation: initial_active_presentation,
  presentations: List([{id: initial_active_presentation}]),
  slides: List([{id: initial_active_slide, presentation_id: initial_active_presentation,title: 'Title', subtitle: 'Subtitle', data:null, position: 0}]),
});

const presentationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.push({id: uniqid(), title: 'Title', subtitle: 'Subtitle', data:null, position: 0})));
    case 'DELETE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.filter((slide, index) => index !== action.payload.key)));
    case 'SAVE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.map((slide) => { if (slide.id === action.slideID) slide.data = action.slideData; return slide })))
    case 'LOAD_PRESENTATION':
      return state.merge(state, state.set('presentation', action.payload));
    case 'SET_ACTIVE_SLIDE': 
      return state.set('active_slide', action.slideID)
    case 'CHANGE_SLIDE_ORDER':
        let newState = state.toJS();
        let currentSlides = newState.slides;
        let dragSlide = currentSlides[action.selectedSlide];
        currentSlides.splice(action.selectedSlide, 1);
        currentSlides.splice(action.hoverSlide, 0, dragSlide);
        let newSlideOrder = currentSlides;
        return state.merge(state, state.update('slides', slides => slides.map((slide, index) => newSlideOrder[index])));
    default:
      return state;
  }
}

export default presentationReducer;