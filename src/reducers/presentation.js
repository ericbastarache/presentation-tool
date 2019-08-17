import Immutable, {
  List
} from 'immutable'
import {
  uniqid
} from 'lib/helpers';

const INITIAL_STATE = Immutable.fromJS({
  active_presentation: null,
  presentations: List([]),
  active_slide: null,
  slides: List([])
})

const presentationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_PRESENTATION':
      let newPresentationID = uniqid();
      return state.merge(state, state.withMutations(map => {
        map.set('active_presentation', newPresentationID)
          .update('presentations', presentations => presentations.push({
            id: newPresentationID,
            title: "Title"
          }))
          .update('slides', slides => slides.push({
            presentationID: newPresentationID,
            slides: [{
              id: uniqid(),
              presentationID: newPresentationID,
              data: null,
              position: 0
            }]
          }))
      }))
    case 'SET_ACTIVE_PRESENTATION':
      return state.merge(state, state.set('active_presentation', action.id))
    case 'SET_PRESENTATION_TITLE':
      return state.merge(state, state.update('presentations', presentations =>
        presentations.update(
          state.get('presentations').findIndex(presentation => presentation.id === action.id), (presentation) => {
            return {
              ...presentation,
              title: action.title
            }
          })
      ))
    case 'CREATE_SLIDE':
      return state.merge(state,
        state.update('slides', slides =>
          slides.update(
            state.get('slides').findIndex(slides =>
              slides.presentationID === state.get('active_presentation')),
              slides => {
                return {
                  ...slides,
                  slides: [
                    ...slides.slides,
                    {
                    id: uniqid(),
                    presentationID: state.get('active_presentation'),
                    data: null,
                    position: 'test'  
                    }
                  ]
                }
              }
          )))
    case 'DELETE_SLIDE':
      let newState = {
        ...state
      };
      let slideToRemove = null;
      newState.slides.forEach((slide, index) => {
        if (slide.id === state.active_slide) slideToRemove = index
      })
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

      return Object.assign({}, state, {
        slides: [...newState.slides],
        active_slide: newState.active_slide
      });
    case 'SAVE_SLIDE':
      let slides = state.slides.map((slide) => {
        if (slide.id === action.slideID) {
          slide.data = action.slideData
        }
        return slide;
      });
      return {
        ...state, slides: slides
      }
      case 'LOAD_PRESENTATION':
        return state.merge(state, state.set('presentation', action.payload));
      case 'SET_ACTIVE_SLIDE':
        return {
          ...state, active_slide: action.slideID
        }
        case 'CHANGE_SLIDE_ORDER':
          let newSlideOrder = [...state.slides];
          let dragSlide = newSlideOrder[action.selectedSlide];
          newSlideOrder.splice(action.selectedSlide, 1);
          newSlideOrder.splice(action.hoverSlide, 0, dragSlide);
          return Object.assign({}, state, {
            slides: newSlideOrder
          });
        default:
          return state;
  }
}

export default presentationReducer;