import React from 'react';
import { fabric } from 'fabric';

var canvas = null

const Canvas = ({slide, saveSlide}) => {
  const canvasEl = React.createRef();

  const renderSlideWithData = (slide) => {
    if (slide.data !== null && slide.data) {
      canvas.clear();
      canvas.loadFromJSON(JSON.parse(slide.data))
    }
  }


  const renderSlideWithoutData = (slide) => {
      if (slide.data === null) {
        canvas.clear()
        for (let [key, value] of Object.entries(slide)) {
          switch (key) {
            case 'title':
              canvas.add(new fabric.Text(value))
            break;
            case 'subtitle':
              canvas.add(new fabric.Text(value))
            break;
            case 'id':
              canvas.add(new fabric.Text(value))
            break;
            default:
              return                  
          }
        }
      } else {
        throw "slide.data is not null"
      }
  }

  React.useEffect(() => {
    canvas = new fabric.Canvas(canvasEl.current)
    if (slide.data && typeof slide.data === 'string')
        renderSlideWithData(slide)
    else
        renderSlideWithoutData(slide)
  },[])

  return (
    <div>
      <canvas width='800px' height='400px' ref={canvasEl}></canvas>
    </div>
  )
}

export default Canvas
