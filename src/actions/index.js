import * as ActionTypes from '../types'

export const createSlide = (slide) => ({
    type: ActionTypes.CREATE_SLIDE,
    slide
})

export const getNewSlide = (presentationID) => ({
    type: ActionTypes.GET_NEW_SLIDE,
    presentationID
})

export const changeSlideOrder = (dragIndex, hoverIndex) => ({
    type: ActionTypes.CHANGE_SLIDE_ORDER,
    dragIndex,
    hoverIndex
})

export const setActiveSlide = (id) => ({
    type: ActionTypes.SET_ACTIVE_SLIDE,
    id
})

export const toggleModal = () => ({
    type: ActionTypes.TOGGLE_MODAL
})

export const updateSlide = (slideID, presentationID, data, thumbnail) => ({
    type: ActionTypes.UPDATE_SLIDE,
    slideID,
    presentationID,
    data,
    thumbnail
})

export const saveSlide = (slideID, presentationID, data) => ({
    type: ActionTypes.SAVE_SLIDE,
    slideID,
    presentationID,
    data
})

export const deleteSlide = () => ({
    type: ActionTypes.DELETE_SLIDE
})

export const logIn = (token) => ({
    type: ActionTypes.LOG_IN,
    token
})

export const createPresentation = (presentation) => ({
    type: ActionTypes.CREATE_PRESENTATION,
    presentation
})

export const getNewPresentation = () => ({
    type: ActionTypes.GET_NEW_PRESENTATION
})

export const setActivePresentation = (id) => ({
    type: ActionTypes.SET_ACTIVE_PRESENTATION,
    id
})

export const setPresentationTitle = (id, title) => ({
    type: ActionTypes.SET_PRESENTATION_TITLE,
    id,
    title
})