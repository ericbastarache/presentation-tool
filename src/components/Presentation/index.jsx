import React from 'react'
import { fabric } from 'fabric'
import { useDrop } from 'react-dnd'
import ItemTypes from 'constants/index'
import Canvas from 'components/Canvas'
import Editor from 'components/Editor'
import Slidebar from 'components/Slidebar'
import Header from 'components/Header'
import Welcome from 'components/Welcome'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { EditorContextProvider } from 'components/Editor/context'
import { SlideContextProvider } from 'components/Slide/context'

let canvas = null;

const useStyles = makeStyles(theme => ({
  height: {
    height: '100%'
  },
  grow: {
    flexGrow: '1'
  },
  overflow: {
    overflow: 'auto'
  },
  canvasContainer: {
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  padding: {
    padding : theme.spacing(1)
  }
}));

const Presentation = ({
  slides,
  activeSlide,
  activePresentation,
  updateSlide,
  setActiveSlide,
  presentations,
  getNewPresentation,
}) => {
  const classes = useStyles();
  const canvasEl = React.createRef(null)

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
      if (width > 1235)
        width = 1235
      //account for border
      width = width - 32
      let height = document.getElementById('canvasContainer').offsetHeight
      height = width * (9 / 16)
      canvas.setDimensions({ width: width, height: height })
    };
    const styleCanvas = () => {
      document.getElementsByClassName('canvas-container')[0].style.boxShadow = "0 1px 3px 1px rgba(60,64,67,.15)"
      document.getElementsByClassName('canvas-container')[0].style.backgroundColor = "#ffffff"
    }
    canvas = new fabric.Canvas(canvasEl.current)
    resizeCanvas()
    styleCanvas()
  }, [])

  React.useEffect(() => {
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

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.SLIDE,
    drop(item, monitor) {
      if (monitor.didDrop())
        return

      const getThumbnail = () => {
        return new Promise(resolve => {
          resolve(canvas.toDataURL({format: 'png',quality: 0.8}));
        });
      }      
      const updateSlideWithThumbnail = async () => {
        const thumbnail = await getThumbnail()
        updateSlide(activeSlide, activePresentation, canvas.toJSON(), thumbnail)
      }
      updateSlideWithThumbnail()


      slides.forEach((slide, index) => {
        console.log(slide, index)
        if (index === item.index) {
          setActiveSlide(slide._id)
        }
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  })

  return (
  <>
    <Grid container>
      <Welcome isModalOpen={(presentations.length === 0) ? true : false} getNewPresentation={getNewPresentation} />
      <Header />
      <Grid item xs={12}>
        <EditorContextProvider canvasObj={canvasObj}>
          <Editor />
        </EditorContextProvider>
      </Grid>
    </Grid>
    <Grid container className={`${classes.grow} ${classes.height}`}>
        <Grid item xs={2} className={classes.height}>
        <div className={`${classes.overflow} ${classes.height}`}>
          <SlideContextProvider canvasObj={canvasObj}>
            <Slidebar slides={slides} />
          </SlideContextProvider>
        </div>
        </Grid>
        <Grid item xs={10} className={classes.padding}>
          <div ref={drop} id="canvasContainer" className={classes.canvasContainer} style={{ border: isOver ? '2px solid #42a5f5' : '2px solid #bbdefb'}}>
            <Canvas ref={canvasEl} />
          </div>
        </Grid>
    </Grid>
  </>
  )
}

export default Presentation
