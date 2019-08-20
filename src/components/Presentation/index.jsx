import React from 'react'
import { fabric } from 'fabric'
import { useDrop } from 'react-dnd'
import ItemTypes from '../../constants/index'
import Canvas from '../Canvas'
import Editor from '../Editor'
import Slidebar from '../Slidebar'
import Header from '../Header'
import Welcome from '../Welcome'
import {Grid} from '@material-ui/core'
import { EditorContextProvider } from '../Editor/context'
import { SlideContextProvider } from '../Slide/context'

let canvas = null; 

const Presentation = ({
                      slides, 
                      activeSlide, 
                      saveSlide, 
                      setActiveSlide, 
                      presentations,
                      getNewPresentation
                    }) => {
  const canvasEl = React.createRef(null)
  const [canvasWidth, setCanvasWidth] = React.useState(null)
  const [canvasHeight, setCanvasHeight] = React.useState(null)
  const canvasObj = () => {
    return canvas
  }

  const renderSlide = (slide) => {
      canvas.clear()
      canvas.loadFromJSON(JSON.parse(slide.data))
  }

  React.useEffect(() => {
    const resizeCanvas = () => {
      let width = document.getElementById('canvasContainer').offsetWidth
      let height = document.getElementById('canvasContainer').offsetHeight
      height = width * height / width
      canvas.setDimensions({width: width, height: height})
    };
    canvas = new fabric.Canvas(canvasEl.current)
    resizeCanvas()
  },[])

  React.useEffect(() =>{
    if (slides.length === 0) {
      canvas.clear()
      return
    }
    slides.forEach((slide) => {
      if (slide._id === activeSlide) {
        renderSlide(slide)
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

  return (
    <Grid container>
      <>{canvasWidth}</>
      <Welcome isModalOpen={(presentations.length === 0) ? true : false} getNewPresentation={getNewPresentation}/>
      <Header />
      <Grid item xs={4}>
      <SlideContextProvider canvasObj={canvasObj}>
        <Slidebar slides={slides}/>
      </SlideContextProvider>
      </Grid>
        <Grid item xs={8}>
          <div ref={drop} id="canvasContainer" className="MuiGrid-root MuiGrid-item" style={{border:  isOver ? '2px solid green' : '2px solid #0080004f', height: '400px', marginLeft: '20px', boxSizing: 'content-box'}}>
              <Canvas ref={canvasEl}/>
              <EditorContextProvider canvasObj={canvasObj}>
                <Editor /> 
              </EditorContextProvider>
          </div>
        </Grid>
    </Grid>
  )
}

export default Presentation
