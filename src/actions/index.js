import * as ActionTypes from '../types'

export const addSlide = () => ({
    type: ActionTypes.CREATE_SLIDE
})

export const changeSlideOrder = (selectedSlide, hoverSlide) => ({
    type: ActionTypes.CHANGE_SLIDE_ORDER,
    selectedSlide,
    hoverSlide
})

export const setActiveSlide = (slideID) => ({
    type: ActionTypes.SET_ACTIVE_SLIDE,
    slideID
})

export const toggleModal = () => ({
    type: ActionTypes.TOGGLE_MODAL
})

export const saveSlide = (slideID, slideData) => ({
    type: ActionTypes.SAVE_SLIDE,
    slideID,
    slideData
})

export const deleteSlide = () => ({
    type: ActionTypes.DELETE_SLIDE
})