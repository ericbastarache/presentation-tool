import React from 'react'
import { fabric } from 'fabric'

export const SlideContext = React.createContext({})

export const SlideContextProvider = props => {
    const {
        canvasObj,
        children
    } = props

    const getCanvas = () => {
        let canvas = canvasObj();
        return canvas
    }

    const slideContext = {
        getCanvas
    }

    return <SlideContext.Provider value={slideContext}>{children}</SlideContext.Provider>
}

export const { SlideContextConsumer } = SlideContext;