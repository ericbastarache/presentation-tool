import React from 'react';

export const SlideContext = React.createContext({})

export const SlideContextProvider = props => {
    const {
        canvasObj,
        children
    } = props
    const canvasEl = canvasObj();

    const getCanvas = () => {
        let canvas = canvasObj();
        return canvas
    }

    const slideContext = {
        getCanvas,
        canvasObj: canvasEl
    }

    return <SlideContext.Provider value={slideContext}>{children}</SlideContext.Provider>
}

export const { SlideContextConsumer } = SlideContext;