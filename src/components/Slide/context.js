import React from 'react';

export const SlideContext = React.createContext({})

export const SlideContextProvider = props => {
    const {
        canvasObj,
        hiddenCanvasObj,
        children
    } = props
    const canvasEl = canvasObj();

    const hiddenCanvasEl = hiddenCanvasObj()

    const getCanvas = () => {
        let canvas = canvasObj();
        return canvas
    }

    const getHiddenCanvas = () => {
        let hiddenCanvas = hiddenCanvasObj()
        return hiddenCanvas
    }

    const slideContext = {
        getCanvas,
        canvasObj: canvasEl,
        getHiddenCanvas,
        hiddenCanvasObj: hiddenCanvasEl
    }

    return <SlideContext.Provider value={slideContext}>{children}</SlideContext.Provider>
}

export const { SlideContextConsumer } = SlideContext;