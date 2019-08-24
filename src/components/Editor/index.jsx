import React from 'react'
import {
  Grid,
  IconButton,
  MenuItem,
  Button,
  Tooltip
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import { EditorContext } from 'components/Editor/context'
import { fabric } from 'fabric';
import SelectInput from 'components/SelectInput';
import { connect } from 'react-redux'
import { 
  getNewSlide,
  deleteSlide
}  from 'actions/index'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  padding: {
    padding : theme.spacing(1)
  }
}));

const Editor = ({ getNewSlide, deleteSlide, activePresentation }) => {
  const classes = useStyles();
  const [size, setFontSize] = React.useState(12);
  const [_clipboard, setClipboard] = React.useState(null);
  const { canvas } = React.useContext(EditorContext);
  const clearCanvas = () => {
    canvas.clear();
    canvas.renderAll();
  }

  const copy = () => {
    if (!!canvas.getActiveObject()) {
      canvas.getActiveObject().clone((cloned) => {
        setClipboard(cloned);
      });
    }
  }
  
  const paste = () => {
    if (!!_clipboard) {
      _clipboard.clone((obj) => {
        canvas.discardActiveObject();
        obj.set({
          left: obj.left + 10,
          top: obj.top + 10,
          evented: true,
        });
        if (obj.type === 'activeSelection') {
          obj.canvas = canvas;
          obj.forEachObject(newObj => {
            canvas.add(newObj);
          });
          obj.setCoords();
        } else {
          canvas.add(obj);
        }
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
      });
    }
  }

  const addShape = (shapeType) => {
    switch (shapeType) {
      case 'square':
        canvas.add(new fabric.Rect({
          width: 100,
          height: 100,
          x: 200,
          y: 200,
          fill: '#ff0000'
        }));
        break;
      default:
        break;
    }
  }

  const toggleTextStyle = (type) => {
    if (!!canvas.getActiveObject() && canvas.getActiveObject().type === 'i-text') {
      const textObj = canvas.getActiveObject();
      switch (type) {
        case 'bold':
            if (textObj.get('fontWeight') === 'normal') {
              textObj.set('fontWeight', 'bold');
              canvas.fire('object:modified');
              canvas.renderAll();
            } else {
              textObj.set('fontWeight', 'normal');
              canvas.fire('object:modified');
              canvas.renderAll();
            }
            break;
        case 'italic':
            if (textObj.get('fontStyle') === 'normal') {
              textObj.set('fontStyle', 'italic');
              canvas.fire('object:modified');
              canvas.renderAll();
            } else {
              textObj.set('fontStyle', 'normal');
              canvas.fire('object:modified');
              canvas.renderAll();
            }
            break;
        case 'underline':
          if (!textObj.get('underline')) {
            textObj.set('underline', true);
            canvas.fire('object:modified');
            canvas.renderAll();
          } else {
            textObj.set('underline', false);
            canvas.fire('object:modified');
            canvas.renderAll();
          }
          break;
        case 'linethrough':
          if (!textObj.get('linethrough')) {
            textObj.set('linethrough', true);
            canvas.fire('object:modified');
            canvas.renderAll();
          } else {
            textObj.set('linethrough', false);
            canvas.fire('object:modified');
            canvas.renderAll();
          }
          break;
        default:
          break;
      }
    }
  }

  const addText = () => {
    canvas.add(new fabric.IText('Edit Me'))
  }

  const fontSizeChange = (e) => {
    if (!!canvas.getActiveObject() && canvas.getActiveObject().type === 'i-text') {
      setFontSize(e.target.value);
      canvas.getActiveObject().set('fontSize', e.target.value);
      canvas.fire('object:modified');
      canvas.renderAll();
    }
  }

  const sendDirection = (direction) => {
    if (!!canvas.getActiveObject()) {
      if (direction === 'front') {
        console.log(canvas.getActiveObject().bringToFront());
        canvas.getActiveObject().bringToFront();
        // canvas.renderAll();
      }
      if (direction === 'back') {
        canvas.getActiveObject().sendToBack();
        // canvas.renderAll();
      }
    }
  }

  const toggleFontSize = (type) => {
    if (!!canvas.getActiveObject() && canvas.getActiveObject().type === 'i-text') {
      let fontSize = canvas.getActiveObject().get('fontSize');
      if (type === 'increase') {
        let newFontSize = fontSize + 1;
        canvas.getActiveObject().set('fontSize', newFontSize);
        canvas.fire('object:modified');
        canvas.renderAll()
      } else {
        if (fontSize > 0) {
          let newFontSize = fontSize - 1;
          canvas.getActiveObject().set('fontSize', newFontSize)
          canvas.fire('object:modified');
          canvas.renderAll()
        }
      }
    }
  }
  return (
    <Grid item xs={12}>
      <Grid container direction="column" alignItems="flex-start" className={classes.padding}>
        <Grid item>
          <Tooltip title="Add Slide">
            <IconButton variant="contained" size="small" onClick={() => getNewSlide(activePresentation)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Slide">
            <IconButton variant="contained" size="small" onClick={() => console.log('IMPLEMENT COPY SLIDE')}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Slide">
            <IconButton variant="contained" size="small" onClick={deleteSlide}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bring to Front">
            <IconButton variant="contained" size="small" onClick={() => sendDirection('front')}>
              <FlipToFrontIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send to Back">
            <IconButton variant="contained" size="small" onClick={() => sendDirection('back')}>
              <FlipToBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bold">
            <IconButton onClick={() => toggleTextStyle('bold')} variant="contained" size="small">
              <BoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton onClick={() => toggleTextStyle('italic')} variant="contained" size="small">
              <ItalicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton onClick={() => toggleTextStyle('underline')} variant="contained" size="small">
              <UnderlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Strike through">
            <IconButton onClick={() => toggleTextStyle('linethrough')} variant="contained" size="small">
              <FormatStrikethroughIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Text">
            <IconButton onClick={() => addText()} variant="contained" size="small" color="primary">
              <TextFormatIcon />
            </IconButton>
          </Tooltip>
          <SelectInput value={size} onChange={(e) => fontSizeChange(e)}>
            {[...Array(121).keys()].map(num => (
              num === 0 ? null : <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </SelectInput>
          <Tooltip title="Increase font size">
            <IconButton size="small" onClick={() => toggleFontSize('increase')}>
              <ArrowDropUpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Decrease font size">
            <IconButton size="small" onClick={() => toggleFontSize('decrease')}>
              <ArrowDropDownIcon />
            </IconButton>
          </Tooltip>
          <Button onClick={() => addShape('square')}>
            Square
          </Button>
          <Tooltip title="Copy Object">
            <Button onClick={() => copy()}>
              Copy
            </Button>
          </Tooltip>
          <Tooltip title="Paste Object">
            <Button onClick={() => paste()}>
              Paste
            </Button>
          </Tooltip>
          <Tooltip title="Clear canvas">
            <IconButton onClick={() => clearCanvas()} variant="contained" size="small" color="secondary" aria-label="small contained secondary button ">
              <ClearIcon />
            </IconButton>
          </Tooltip>
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