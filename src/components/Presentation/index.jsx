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
                      createPresentation
                    }) => {
  const canvasEl = React.createRef(null);
  const canvasObj = () => {
    return canvas
  }

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

  return (
    <Grid container>
      <Welcome isModalOpen={(presentations.length === 0) ? true : false} createPresentation={createPresentation}/>
      <Header />
      <Grid item xs={4}>
      <SlideContextProvider canvasObj={canvasObj}>
        <Slidebar slides={slides}/>
      </SlideContextProvider>
      </Grid>
        <Grid item xs={8}>
          <div ref={drop} className="MuiGrid-root MuiGrid-item" style={{border:  isOver ? '2px solid green' : '2px solid #0080004f', height: '400px', marginLeft: '20px'}}>
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
