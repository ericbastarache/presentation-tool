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
};

const presentationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SLIDE':
      let newSlideID = uniqid();
      if (state.slides.length === 0) {
        return Object.assign({}, state, { active_slide: newSlideID, slides: [...state.slides, {id: newSlideID, presentation_id: initial_active_presentation,title: 'Title', subtitle: 'Subtitle', data:null, position: state.slides.length-1}] });  
      } else {
        return Object.assign({}, state, { slides: [...state.slides, {id: newSlideID, presentation_id: initial_active_presentation,title: 'Title', subtitle: 'Subtitle', data:null, position: state.slides.length-1}] });
      }
    case 'DELETE_SLIDE':
        let newState = {...state};
        let slideToRemove = null;
        newState.slides.forEach((slide, index) => {if (slide.id === state.active_slide) slideToRemove = index})
        newState.active_slide = null;
        //update active_slide as long as not all slides have bene deleted
        if (slideToRemove !== 0) {
          newState.slides.forEach((slide, index) => {
            if (index === (slideToRemove - 1))
              newState.active_slide = slide.id
          })
        }
        newState.slides.splice(slideToRemove, 1)

        if (slideToRemove === 0) {
          if (newState.slides.length > 0)
            newState.active_slide = newState.slides[0].id
        }

        return Object.assign({}, state, { slides: [...newState.slides], active_slide: newState.active_slide });
    case 'SAVE_SLIDE':
      let slides = state.slides.map((slide) => {
        if (slide.id === action.slideID) {
          slide.data = action.slideData
        }
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