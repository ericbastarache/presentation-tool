import React from 'react'
import { 
    Grid, Button, ButtonGroup
} from '@material-ui/core'
import { EditorContext } from './context'


const Editor = ({}) => {
   const canvas = React.useContext(EditorContext)
    return (
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item>
              <Button onClick={canvas.toggleBold} variant="contained" size="small">B</Button>
              <Button onClick={canvas.addText} variant="contained" size="small" color="primary">Add Text</Button>
              <Button onClick={canvas.clearCanvas} variant="contained" size="small" color="secondary" aria-label="small contained secondary button ">Clear</Button>
              <ButtonGroup>
                <Button size="small" onClick={() => canvas.toggleFontSize('increase')}>+</Button>
                <Button size="small" onClick={() => canvas.toggleFontSize('decrease')}>-</Button>
              </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default Editor