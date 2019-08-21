import React, { useEffect } from 'react'
import { 
    Grid,
    Button,
    MenuItem,
    ButtonGroup
} from '@material-ui/core'
import { EditorContext } from './context'
import { fabric } from 'fabric';
import SelectInput from 'components/SelectInput';
import { fontSizes } from 'constants/font'

const Editor = ({}) => {
  const [size, setFontSize] = React.useState(12);
  const { canvas } = React.useContext(EditorContext)
  const clearCanvas = () => {
    canvas.clear()
}

const toggleBold = () => {
    if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null)
    return
    (canvas.getActiveObject().get('fontWeight') === 'normal') ? canvas.getActiveObject().set('fontWeight', 'bold') : canvas.getActiveObject().set('fontWeight', 'normal')
    canvas.renderAll();
}

const addText = () => {
    canvas.add(new fabric.IText('Edit Me'))
}

const fontSizeChange = (e) => {
  if (!!canvas.getActiveObject() && canvas.getActiveObject().type === 'i-text') {
    setFontSize(e.target.value);
    canvas.getActiveObject().set('fontSize', e.target.value);
    canvas.renderAll();
  }
}

const toggleFontSize = (type) => {
    if (!!canvas.getActiveObject() && canvas.getActiveObject().type === 'i-text') {
      let fontSize = canvas.getActiveObject().get('fontSize');
      if (type === 'increase') {
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
  }
    return (
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item>
              <Button onClick={() => toggleBold()} variant="contained" size="small">B</Button>
              <Button onClick={() => addText()} variant="contained" size="small" color="primary">Add Text</Button>
              <Button onClick={() => clearCanvas()} variant="contained" size="small" color="secondary" aria-label="small contained secondary button ">Clear</Button>
              <SelectInput value={size} onChange={(e) => fontSizeChange(e)}>
                {fontSizes.map(({ id, value }) => (
                  <MenuItem key={id} value={value}>{value}</MenuItem>
                ))}
              </SelectInput>
              <ButtonGroup>
                <Button size="small" onClick={() => toggleFontSize('increase')}>+</Button>
                <Button size="small" onClick={() => toggleFontSize('decrease')}>-</Button>
              </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default Editor