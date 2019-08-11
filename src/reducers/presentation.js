import {
  uniqid
} from 'lib/helpers';

const initial_active_slide = uniqid();
const initial_active_presentation = uniqid();

const INITIAL_STATE = {
  active_presentation: initial_active_presentation,
  presentations: [{id: initial_active_presentation}],
  active_slide: initial_active_slide,
  slides: [{id: initial_active_slide, presentation_id: initial_active_presentation, title: 'Title', subtitle: 'Subtitle', data:null, position: 0}],
  canvas: null
};

const presentationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SLIDE':
      return Object.assign({}, state, { slides: [...state.slides, {id: uniqid(), presentation_id: initial_active_presentation,title: 'Title', subtitle: 'Subtitle', data:null, position: state.slides.length-1}] });
    case 'DELETE_SLIDE':
      return state.merge(state, state.update('slides', slides => slides.filter((slide, index) => index !== action.payload.key)));
    case 'SAVE_SLIDE':
      let slides = state.slides.map((slide) => {
        if (slide.id === action.slideID)
          slide.data = action.slideData
        return slide;
      });
      return {...state, slides:slides}
    case 'LOAD_PRESENTATION':
      return state.merge(state, state.set('presentation', action.payload));
    case 'SET_ACTIVE_SLIDE': 
      return {...state, active_slide:action.slideID}
    case 'CHANGE_SLIDE_ORDER':
        let newSlideOrder = [...state.slides]; 
        let dragSlide = newSlideOrder[action.selectedSlide]; 
        newSlideOrder.splice(action.selectedSlide, 1);
        newSlideOrder.splice(action.hoverSlide, 0, dragSlide);
        return Object.assign({}, state, { slides: newSlideOrder });
    default:
      return state;
  }
}

export default presentationReducer;