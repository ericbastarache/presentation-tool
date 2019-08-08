import * as ActionTypes from '../types'

export const addSlide = () => ({
    type: ActionTypes.CREATE_SLIDE
})

export const changeSlideOrder = (selectedSlide, hoverSlide) => ({
    type: ActionTypes.CHANGE_SLIDE_ORDER,
    selectedSlide,
    hoverSlide
})

export const setActiveSlide = (slideIndex) => ({
    type: ActionTypes.SET_ACTIVE_SLIDE,
    slideIndex
})

export const saveSlide = (slideIndex, slideData) => ({
    type: ActionTypes.SAVE_SLIDE,
    slideIndex,
    slideData
})