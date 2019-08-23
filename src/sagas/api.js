import { 
    INITIAL_CANVAS_DATA, 
    INITIAL_CANVAS_WIDTH, 
    INITIAL_CANVAS_HEIGHT } from '../constants/canvas'
import { INITIAL_SLIDE_THUMBNAIL } from '../constants/slide'
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getNewPresentation = () => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/presentations/create`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            title: "Title",
            slides: [{
                data: JSON.stringify(INITIAL_CANVAS_DATA),
                thumbnail: INITIAL_SLIDE_THUMBNAIL,
                canvasDimensions: {
                    height: INITIAL_CANVAS_HEIGHT,
                    width: INITIAL_CANVAS_WIDTH
                }
            }]
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}

export const getNewSlide = (presentationID) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/slides/create`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            id: presentationID,
            data: JSON.stringify(INITIAL_CANVAS_DATA),
            thumbnail: INITIAL_SLIDE_THUMBNAIL,
            canvasDimensions: {
                height: INITIAL_CANVAS_HEIGHT,
                width: INITIAL_CANVAS_WIDTH
            }
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}

export const getLastSlide = (presentationID) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/last_slide`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            id: presentationID,
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}

export const updateSlide = (slideID, presentationID, slideData, thumbnail, canvasDimensions) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/slides/update/${slideID}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({
            presentation: presentationID,
            data: JSON.stringify(slideData),
            thumbnail,
            canvasDimensions
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}