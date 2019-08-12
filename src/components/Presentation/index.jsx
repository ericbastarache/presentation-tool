import React from 'react'
import { fabric } from 'fabric'
import { useDrop } from 'react-dnd'
import ItemTypes from '../../constants/index'
import Canvas from '../Canvas'
import Editor from '../Editor'
import Slidebar from '../Slidebar'
import {Grid} from '@material-ui/core'

let canvas = null;


const Presentation = ({slides, activeSlide, saveSlide, setActiveSlide, changeSlideOrder}) => {
  const canvasEl = React.createRef(null);
  const renderSlideWithData = (slide) => {
    if (slide.data !== null && slide.data) {
      canvas.clear();
      canvas.loadFromJSON(JSON.parse(slide.data))
    }
  }

  const clearCanvas = () => {
    canvas.clear()
  }

  const setBold = () => {
    if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null)
      return
    canvas.getActiveObject().set('fontWeight', 'bold')
    canvas.renderAll();
  }

  const addText = () => {
    canvas.add(new fabric.IText('Edit Me'))
  }

  const increaseFontSize = () => {
    if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null)
      return
    let fontSize = canvas.getActiveObject().get('fontSize')
    let newFontSize = fontSize + 1;
    canvas.getActiveObject().set('fontSize', newFontSize)
    canvas.renderAll()
  }

  const decreaseFontSize = () => {
    if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null)
      return
    let fontSize = canvas.getActiveObject().get('fontSize')
    if (fontSize > 1) {
      let newFontSize = fontSize - 1;
      canvas.getActiveObject().set('fontSize', newFontSize)
      canvas.renderAll()
    }
    return
  }
  

  const renderSlideWithoutData = (slide) => {
      if (slide.data === null) {
        canvas.clear()
        for (let [key, value] of Object.entries(slide)) {
          switch (key) {
            case 'title':
              canvas.add(new fabric.IText(value))
            break;
            case 'subtitle':
              canvas.add(new fabric.IText(value))
            break;
            case 'id':
              canvas.add(new fabric.IText(value))
            break;
            default:
              break;                  
          }
        }
      }
  }

  const handleSlideOnClick = (slideID) => {
    saveSlide(activeSlide, JSON.stringify(canvas))
    setActiveSlide(slideID)
  }

  React.useEffect(() => {
    canvas = new fabric.Canvas(canvasEl.current)
  },[])

  React.useEffect(() =>{
    if (slides.length === 0) {
      canvas.clear()
      return
    }
    slides.forEach((slide) => {
      if (slide.id === activeSlide) {
        if (slide.data && typeof slide.data === 'string') {
          renderSlideWithData(slide)
        }
        if (slide.data === null) {
          renderSlideWithoutData(slide)
        }
      }
    })
  }, [activeSlide])

  const [{ isOver, isOverCurrent}, drop] = useDrop({
    accept: ItemTypes.SLIDE,
    drop(item, monitor) {
      if (monitor.didDrop())
        return

      saveSlide(activeSlide, JSON.stringify(canvas))
      slides.map((slide, index) => {
        if (index === item.index) {
          setActiveSlide(slide.id)
        }
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true})
    })
  })

  const border = isOver ? '2px solid green' : '2px solid #0080004f';
  return (
    <Grid container>
      <Grid item xs={4}>
        <Slidebar
          changeSlideOrder={changeSlideOrder}
          setActiveSlide={setActiveSlide}
          activeSlide={activeSlide}
          slides={slides}
          handleSlideOnClick = {handleSlideOnClick}
        />
      </Grid>
      <Grid item xs={8}>
        <div ref={drop} className="MuiGrid-root MuiGrid-item" style={{border, height: '400px', marginLeft: '20px'}}>
            <Canvas ref={canvasEl}/>
            <Editor 
              canvas={canvasEl} 
              clearCanvas={clearCanvas} 
              setBold={setBold} 
              addText={addText}
              increaseFontSize={increaseFontSize}
              decreaseFontSize={decreaseFontSize}
            /> 
        </div>
      </Grid>
  </Grid>
  )
}

export default Presentation
