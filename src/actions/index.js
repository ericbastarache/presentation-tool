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

export const updateSlide = (slideID, presentationID, data, canvasDimensions) => ({
    type: ActionTypes.UPDATE_SLIDE,
    slideID,
    presentationID,
    data,
    canvasDimensions
})

export const saveSlide = (slideID, presentationID, data, canvasDimensions) => ({
    type: ActionTypes.SAVE_SLIDE,
    slideID,
    presentationID,
    data,
    canvasDimensions
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

export const loadPresentations = (presentations) => ({
    type: ActionTypes.LOAD_PRESENTATIONS,
    presentations
})

export const getNewPresentation = () => ({
    type: ActionTypes.GET_NEW_PRESENTATION
})

export const getNewTempPresentation = (userID) => ({
    type: ActionTypes.GET_NEW_TEMP_PRESENTATION,
    userID
})

export const loadTempPresentations = (userID) => ({
    type: ActionTypes.LOAD_TEMP_PRESENTATIONS,
    userID
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