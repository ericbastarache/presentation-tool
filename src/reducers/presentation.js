import Immutable, {
  List
} from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
  active_presentation: null,
  presentations: List([]),
  active_slide: null,
  slides: List([])
})

const presentationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_PRESENTATION':
      return state.merge(state, state.withMutations(map => {
        const { presentation } = action.presentation;
        map.set('active_presentation', presentation._id)
          .update('presentations', presentations => presentations.push(presentation))
          .set('slides', List(presentation.slides))
          .set('active_slide', presentation.slides[0]._id)
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
      const { slide } = action.slide
      return state.merge(state, state.update('slides', slides => slides.push(slide)))
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
        const {data, canvasDimensions} = action
        return state.merge(state, state.update('slides', slides =>
        slides.update(
          state.get('slides').findIndex(slide => slide._id === action.slideID), (slide) => {
            return {
              ...slide,
              data: JSON.stringify(data),
              canvasDimensions: canvasDimensions
            }
          })
      ))
      case 'LOAD_PRESENTATION':
        return state.merge(state, state.set('presentation', action.payload));
      case 'LOAD_PRESENTATIONS':
        return state.merge(state, state.withMutations(map => {
          map.set('active_presentation', action.presentations[action.presentations.length - 1]._id)
            .set('presentations', List(action.presentations))
            .set('slides', List(action.presentations[action.presentations.length - 1].slides))
            .set('active_slide', action.presentations[action.presentations.length - 1].slides[0]._id)
        }))
      case 'SET_ACTIVE_SLIDE':
        return state.merge(state, state.set('active_slide', action.id))
        case 'CHANGE_SLIDE_ORDER':
          let dragSlide = state.get('slides').get(action.dragIndex)
          return state.merge(state, state.set('slides', state.get('slides').delete(action.dragIndex).insert(action.hoverIndex, dragSlide))) 
        default:
          return state;
  }
}

export default presentationReducer;