import { INITIAL_SLIDE_DATA } from '../constants'
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
                data: JSON.stringify(INITIAL_SLIDE_DATA)
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
            data: INITIAL_SLIDE_DATA
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