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
import { connect } from 'react-redux'
import { 
  getNewSlide, 
  deleteSlide
  }  from '../../actions/index'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  padding: {
    padding : theme.spacing(1)
  }
}));

const Editor = ({ getNewSlide, deleteSlide, activePresentation }) => {
  const classes = useStyles()
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
    <Grid item xs={12}>
      <Grid container direction="column" alignItems="flex-start" className={classes.padding}>
        <Grid item>
          <Button variant="contained" size="small" onClick={() => getNewSlide(activePresentation)}>Add Slide</Button>
          <Button variant="contained" size="small" onClick={deleteSlide}>Delete Slide</Button>
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

const mapStateToProps = state => ({
  activePresentation : state.presentation.get('active_presentation')
})

const mapDispatchToProps = dispatch => ({
  deleteSlide: () => dispatch(deleteSlide()),
  getNewSlide: (activePresentation) => dispatch(getNewSlide(activePresentation))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)