import React from 'react'
import { 
    Grid, Button, ButtonGroup
} from '@material-ui/core'

const Editor = ({clearCanvas, setBold, addText, increaseFontSize, decreaseFontSize}) => {
    return (
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item>
              <Button onClick={setBold} variant="contained" size="small">B</Button>
              <Button onClick={addText} variant="contained" size="small" color="primary">Add Text</Button>
              <Button onClick={clearCanvas} variant="contained" size="small" color="secondary" aria-label="small contained secondary button ">Clear</Button>
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