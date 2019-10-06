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

export const updateSlide = (token, slideID, presentationID, data, canvasDimensions) => ({
    type: ActionTypes.UPDATE_SLIDE,
    token,
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

export const deleteSlide = (token, slideID, presentationID) => ({
    type: ActionTypes.REQUEST_DELETE_SLIDE,
    token,
    slideID,
    presentationID
})

export const setSlides = (slides, activeSlide) => ({
    type: ActionTypes.SET_SLIDES,
    slides,
    activeSlide
})

export const createPresentation = (presentation) => ({
    type: ActionTypes.CREATE_PRESENTATION,
    presentation
})

export const loadPresentations = (presentations) => ({
    type: ActionTypes.LOAD_PRESENTATIONS,
    presentations
})

export const getPresentations = (token) => ({
    type: ActionTypes.GET_PRESENTATIONS,
    token
})

export const getNewPresentation = () => ({
    type: ActionTypes.GET_NEW_PRESENTATION
})

export const getTempPresentations = (token) => ({
    type: ActionTypes.GET_TEMP_PRESENTATIONS,
    token
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

export const updateThumbnail = (slideID, thumbnail) => ({
    type: ActionTypes.UPDATE_THUMBNAIL,
    slideID,
    thumbnail
})

export const updateThumbnails = (slides) => ({
    type: ActionTypes.UPDATE_THUMBNAILS,
    slides
})

export const setColor = (color) => ({
    type: ActionTypes.SET_COLOR,
    color
})