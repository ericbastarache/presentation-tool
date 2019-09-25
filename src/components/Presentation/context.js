import React from 'react'

export const CanvasContext = React.createContext({})

export const CanvasContextProvider = props => {
    const {
        children,
        canvasObj
    } = props

    const clearCanvas = () => {
        let canvas = canvasObj();
        canvas.clear()
    }

    const toggleBold = () => {
        let canvas = canvasObj();
        if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null)
        return
        (canvas.getActiveObject().get('fontWeight') == 'normal') ? canvas.getActiveObject().set('fontWeight', 'bold') : canvas.getActiveObject().set('fontWeight', 'normal')
        canvas.renderAll();
    }

    const canvasContext = {
        clearCanvas,
        toggleBold
    }

    return <CanvasContext.Provider value={canvasContext}>{children}</CanvasContext.Provider>
}

export const { CanvasContextConsumer } = CanvasContext;