import React from 'react'
import { fabric } from 'fabric'
import { 
    Grid, Button, ButtonGroup
} from '@material-ui/core'

const Editor = ({clearCanvas, setBold}) => {
    return (
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item>
            <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
              <Button onClick={setBold}>B</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default Editor