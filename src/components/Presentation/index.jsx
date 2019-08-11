import React from 'react'
import { fabric } from 'fabric'
import { useDrop } from 'react-dnd'
import ItemTypes from '../../constants/index'
import Canvas from '../Canvas'
import Editor from '../Editor'
import {Button} from '@material-ui/core'

let canvas = null;


const Presentation = ({slides, activeSlide, saveSlide, setActiveSlide}) => {
  const canvasEl = React.createRef();
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
    if (canvas.getActiveObject() === undefined || null)
      return
    canvas.getActiveObject().set('fontWeight', 'bold')
    canvas.renderAll();
  }

  const addText = () => {
    canvas.add(new fabric.IText('Edit Me'))
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
      } else {
        throw "slide.data is not null"
      }
  }

  React.useEffect(() => {
    canvas = new fabric.Canvas(canvasEl.current)
  },[])

  React.useEffect(() =>{
    slides.map((slide) => {
      if (slide.id === activeSlide) {
        if (slide.data && typeof slide.data === 'string') {
          renderSlideWithData(slide)
          return
        }
        if (slide.data === null) {
          renderSlideWithoutData(slide)
          return
        }
      }
      return
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
    <div ref={drop} className="MuiGrid-root MuiGrid-item" style={{border, height: '400px', marginLeft: '20px'}}>
        <Canvas ref={canvasEl}/>
        <Editor 
          canvas={canvasEl} 
          clearCanvas={clearCanvas} 
          setBold={setBold} 
          addText={addText}
        /> 
    </div>
  )
}

export default Presentation
