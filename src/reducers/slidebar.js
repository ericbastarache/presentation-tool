const INITIAL_STATE = {
  slide_order: null
};

const slidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

export default slidebarReducer;