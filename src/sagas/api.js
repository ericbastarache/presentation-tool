import { 
    INITIAL_CANVAS_DATA, 
    INITIAL_CANVAS_WIDTH, 
    INITIAL_CANVAS_HEIGHT } from '../constants/canvas'
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

export const getTempPresentations = (userID) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/presentations/load_temp_presentations`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            userID
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}

export const getNewTempPresentation = (userID) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/presentations/create`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            title: "Title",
            userID,
            slides: [{
                data: JSON.stringify(INITIAL_CANVAS_DATA),
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

export const updateSlide = (slideID, presentationID, slideData, canvasDimensions) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/slides/update/${slideID}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({
            presentation: presentationID,
            data: JSON.stringify(slideData),
            canvasDimensions
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}