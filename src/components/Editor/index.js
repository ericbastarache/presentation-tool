import React from 'react'
import { 
    Grid, Button, ButtonGroup
} from '@material-ui/core'
import { CanvasContext } from '../Presentation/context'

const Editor = ({clearCanvas, setBold, addText, increaseFontSize, decreaseFontSize}) => {
  const canvasContext = React.useContext(CanvasContext)
    return (
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item>
              <Button onClick={setBold} variant="contained" size="small">B</Button>
              <Button onClick={addText} variant="contained" size="small" color="primary">Add Text</Button>
              <Button onClick={canvasContext.clearCanvas} variant="contained" size="small" color="secondary" aria-label="small contained secondary button ">Click me to Test Context</Button>
              <ButtonGroup>
                <Button size="small" onClick={increaseFontSize}>+</Button>
                <Button size="small" onClick={decreaseFontSize}>-</Button>
              </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default Editor