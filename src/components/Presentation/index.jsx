import React from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../constants/index'

var canvas = null

const Presentation = ({slides, activeSlide, saveSlide, setActiveSlide}) => {
  const canvasEl = React.createRef();

  const renderCanvasWithNewSlide = (slideIndex) => {
      if (slides[activeSlide].data === null) {
        //render just the text
        canvas.clear();
        Object.values(slides[activeSlide]).map((slide) => {
          if (slide === null)
            return
            canvas.add(new fabric.Text(slide.toString()))
        })
      } else {
        canvas.clear();
        canvas.loadFromJSON(JSON.parse(slides[activeSlide].data))
      }
  }

  React.useEffect(() => {
    canvas = new fabric.Canvas(canvasEl.current)
    Object.values(slides[activeSlide]).map((slide) => {
      if (slide === null)
        return
        canvas.add(new fabric.Text(slide.toString()))
    })
  },[])

  React.useEffect(() =>{
    renderCanvasWithNewSlide(activeSlide)
  }, [activeSlide])

  const [{ isOver, isOverCurrent}, drop] = useDrop({
    accept: ItemTypes.SLIDE,
    drop(item, monitor) {
      if (monitor.didDrop())
        return
      saveSlide(activeSlide, JSON.stringify(canvas))
      setActiveSlide(item.index)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true})
    })
  })

  const border = isOver ? '2px solid green' : '2px solid #0080004f';
  return (
    <div ref={drop} className="MuiGrid-root MuiGrid-item" style={{border, height: '400px', marginLeft: '20px'}}>
      <canvas width='800px' height='400px' ref={canvasEl}></canvas>
    </div>
  )
}

export default Presentation
