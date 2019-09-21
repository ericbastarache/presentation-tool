import Immutable, {
  List
} from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
  active_presentation: null,
  presentations: List([]),
  active_slide: null,
  slides: List([]),
  slide_count: 0
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
          .set('slide_count', state.get('slides').count() + 1)
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
      return state.merge(state, state
        .update('slides', slides => slides.push(slide))
        .set('slide_count', state.get('slides').count() + 1)
        .set('active_slide', slide._id)
      )
    case 'DELETE_SLIDE':
      let slideToRemove = state.get('slides').findIndex((slide) => slide._id === state.get('active_slide'));
      let slideCount = state.get('slides').count();
      let activeSlide = null;
      if (slideCount > 1) {
        if (state.get('slides').has(slideToRemove + 1)){
          activeSlide = state.get('slides').get(slideToRemove + 1)._id;
        } else {
          activeSlide = state.get('slides').get(slideToRemove - 1)._id;
        }
        slideCount = state.get('slides').count() - 1;
      } else {
        slideCount = 0;
      }
      return state.merge(state, state
        .update('slides', slides => slides.delete(slideToRemove))
        .set('active_slide', activeSlide)
        .set('slide_count', slideCount)
      )
    case 'SAVE_SLIDE':
        return state.merge(state, state.update('slides', slides =>
        slides.update(
          state.get('slides').findIndex(slide => slide._id === action.slideID), (slide) => {
            return {
              ...slide,
              data: JSON.stringify(action.data),
              canvasDimensions: action.canvasDimensions,
              thumbnail: action.thumbnail
            }
          })
      ))
      case 'LOAD_PRESENTATION':
        return state.merge(state, state
          .set('presentation', action.payload)
        );
      case 'LOAD_PRESENTATIONS':
        return state.merge(state, state.withMutations(map => {
          map.set('active_presentation', action.presentations[action.presentations.length - 1]._id)
            .set('presentations', List(action.presentations))
            .set('slides', 
                 (action.presentations[action.presentations.length - 1].slides.length > 0) 
                    ? List(action.presentations[action.presentations.length - 1].slides)
                    : List([])
            )
            .set('active_slide', 
                  (action.presentations[action.presentations.length - 1].slides.length > 0) 
                  ? action.presentations[action.presentations.length - 1].slides[0]._id
                  : null
            )
            .set('slide_count', 
                  (action.presentations[action.presentations.length - 1].slides.length > 0) 
                  ? action.presentations[action.presentations.length - 1].slides.length
                  : 0
            )
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