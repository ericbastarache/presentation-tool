import React from 'react'

export const EditorContext = React.createContext({})

export const EditorContextProvider = props => {
    const {
        children,
        canvasObj
    } = props

    const canvas = canvasObj();

    const editorContext = {
        canvas
    }

    return <EditorContext.Provider value={editorContext}>{children}</EditorContext.Provider>
}

export const { EditorContextConsumer } = EditorContext;