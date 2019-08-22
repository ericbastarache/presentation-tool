import { 
    INITIAL_CANVAS_DATA,
    INITIAL_CANVAS_THUMBNAIL
} from '../constants'
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
                thumbnail: INITIAL_CANVAS_THUMBNAIL
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
            data: INITIAL_CANVAS_DATA,
            thumbnail: INITIAL_CANVAS_THUMBNAIL
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

export const updateSlide = (slideID, presentationID, slideData, thumbnail) => {
    const data = fetch(`${process.env.REACT_APP_PRESENTATION_ENDPOINT}/slides/update/${slideID}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({
            presentation: presentationID,
            data: JSON.stringify(slideData),
            thumbnail: thumbnail
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return data
}