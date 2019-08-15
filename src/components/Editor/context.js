import React from 'react'
import { fabric } from 'fabric'

export const EditorContext = React.createContext({})

export const EditorContextProvider = props => {
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

    const addText = () => {
        let canvas = canvasObj();
        canvas.add(new fabric.IText('Edit Me'))
    }

    const toggleFontSize = (type) => {
        let canvas = canvasObj();
        if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null)
          return
        let fontSize = canvas.getActiveObject().get('fontSize')
        if (type == 'increase') {
            let newFontSize = fontSize + 1;
            canvas.getActiveObject().set('fontSize', newFontSize)
            canvas.renderAll()
        } else {
            if (fontSize > 0) {
                let newFontSize = fontSize - 1;
                canvas.getActiveObject().set('fontSize', newFontSize)
                canvas.renderAll()
            }
        }
      }

    const editorContext = {
        clearCanvas,
        toggleBold,
        addText,
        toggleFontSize
    }

    return <EditorContext.Provider value={editorContext}>{children}</EditorContext.Provider>
}

export const { EditorContextConsumer } = EditorContext;