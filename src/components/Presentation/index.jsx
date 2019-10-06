import React from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';
import Canvas from 'components/Canvas';
import Slidebar from 'components/Slidebar';
import Editormenu from 'components/Editormenu';
import Welcome from 'components/Welcome';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EditorContextProvider } from 'components/Editor/context';
import { SlideContextProvider } from 'components/Slide/context';
import { handleKeyboardShortcuts } from 'events/index';


let canvas = null;
let hiddenCanvas = null;

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
    backgroundColor: theme.palette.grey['100']
  },
  padding: {
    padding: theme.spacing(1)
  },
  slideBarContainer: {
    backgroundColor: theme.palette.grey['100']
  }
}));

const Presentation = ({
  slides,
  activeSlide,
  setActiveSlide,
}) => {
  const classes = useStyles();
  const canvasEl = React.createRef(null);
  const hiddenCanvasEl = React.createRef(null);

  const canvasObj = () => {
    return canvas
  }

  const hiddenCanvasObj = () => {
    return hiddenCanvas
  }

  const updateSlideWithNewResolution = (canvasObjects, slideWidth) => {
    if (canvas.width != slideWidth) {
      let scaleMultiplier = canvas.width / slideWidth
      let objects = canvasObjects
        for (let i in objects) {
            objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
            objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
            objects[i].left = objects[i].left * scaleMultiplier;
            objects[i].top = objects[i].top * scaleMultiplier;
        }
      return objects
    }
    return false
  }

  const renderSlide = (slide) => {
    let slideData = JSON.parse(slide.data);
    updateSlideWithNewResolution(slideData.objects, slide.canvasDimensions.width);
    canvas.loadFromJSON(slideData);
  }

  React.useEffect(() => {
    const resizeCanvas = () => {
      let width = document.getElementById('canvasContainer').offsetWidth;
      if (width > 1235)
        width = 1235;
      //account for border
      width = width - 32;
      let height = document.getElementById('canvasContainer').offsetHeight;
      height = width * (9 / 16);
      canvas.setDimensions({ width: width, height: height });
      hiddenCanvas.setDimensions({ width: width, height: height });
    };
    const styleCanvas = () => {
      document.getElementsByClassName('canvas-container')[0].style.boxShadow = "0 1px 3px 1px rgba(60,64,67,.15)"
      document.getElementsByClassName('canvas-container')[0].style.backgroundColor = "#ffffff"
      document.getElementsByClassName('hidden-canvas')[0].style.display = "none"
    }
    canvas = new fabric.Canvas(canvasEl.current, {stateful: true});
    document.addEventListener('keydown', (event) => handleKeyboardShortcuts(event, canvas), false)
    hiddenCanvas = new fabric.Canvas(hiddenCanvasEl.current, {containerClass: 'hidden-canvas'});
    canvas.preserveObjectStacking = true;
    hiddenCanvas.preserveObjectStacking = true;
    resizeCanvas();
    styleCanvas();
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts, false);
    }
  }, [])

  React.useEffect(() => {
    if (slides.count() === 0) {
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
    accept: 'SLIDE',
    drop(item, monitor) {
      if (monitor.didDrop())
        return

      slides.forEach((slide, index) => {
        if (index === item.index) {
          setActiveSlide(slide._id)
        }
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  return (
    <>
      <Grid container>
        {/* <Welcome isModalOpen={(presentations.length === 0) ? true : false} getNewPresentation={getNewPresentation} /> */}
        {/* <Header /> */}
          <EditorContextProvider canvasObj={canvasObj}>
            {/* <Editor /> */}
            <Editormenu />
          </EditorContextProvider>
      </Grid>
      <Grid container className={`${classes.grow} ${classes.height} ${classes.slideBarContainer}`}>
        <Grid item xs={2} className={classes.height}>
          <div className={`${classes.overflow} ${classes.height}`}>
            <SlideContextProvider canvasObj={canvasObj} hiddenCanvasObj={hiddenCanvasObj}>
              <Slidebar />
            </SlideContextProvider>
          </div>
        </Grid>
        <Grid item xs={10} className={classes.padding}>
          <div ref={drop} id="canvasContainer" className={classes.canvasContainer} style={{ border: isOver ? '2px solid #42a5f5' : '2px solid #bbdefb' }}>
              <Canvas ref={canvasEl}/>
              <Canvas ref={hiddenCanvasEl} />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Presentation
