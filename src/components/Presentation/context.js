import React from 'react'

export const CanvasContext = React.createContext({})

export const CanvasContextProvider = props => {
    const {
        canvas,
        children,
        test
    } = props

    const clearCanvas = () => {
        console.log(canvas)
    }

    const canvasContext = {
        clearCanvas
    }

    return <CanvasContext.Provider value={canvasContext}>{children}</CanvasContext.Provider>
}

export const { CanvasContextConsumer } = CanvasContext;