import React from 'react';
import {
  Card
} from '@material-ui/core';
import ItemTypes from '../../constants/index'
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { 
  setActiveSlide,  
  changeSlideOrder,
  updateSlide,
} from '../../actions'
import { makeStyles } from '@material-ui/core/styles';
import { SlideContext } from 'components/Slide/context';

const useStyles = makeStyles(theme => ({
  slide: {
    margin: theme.spacing(1)
  }
}));

const Slide = ({index, slide, refs, changeSlideOrder, setActiveSlide, activeSlide, activePresentation, updateSlide}) => {
  const classes = useStyles();
  const ref = React.useRef(null);
  const canvas = React.useContext(SlideContext)
  const {
    canvasObj
  } = canvas;
  
  const handleUpdateThumbnail = async () => {
    if (!!refs.current && refs.current.id === activeSlide) {
      return refs.current.src = await canvasObj.toDataURL({
        format: 'png',
        quality: 0.8
      })
    }
  }
  React.useEffect(() => {
    canvasObj.on('object:modified', () => {
      handleUpdateThumbnail();
    });

    canvasObj.on('text:changed', () => {
      handleUpdateThumbnail();
    });
    
    canvasObj.on('object:added', () => {
      handleUpdateThumbnail();
    })
  });

  /**
   * Effect to save the active slide automatically every 2 minutes.
   * 
   * We need to also add a save button so that the users can choose to save themselves
   * if they don't want to risk losing work, or alternatively make auto save after every object
   * deselection and display toast to the user saying "Slide Saved" or something.
  */
  React.useEffect(() => {
    const saveTimeInterval = setInterval(() => {
      updateSlide(activeSlide, activePresentation, canvasObj.toJSON());
    }, 120000);
    return () => {
      clearInterval(saveTimeInterval);
    }
  }, []);


  const handleClick = () => {
    setActiveSlide(slide._id)
  }
  const [, drop] = useDrop({
    accept: ItemTypes.SLIDE,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      changeSlideOrder(dragIndex, hoverIndex)
      item.index = hoverIndex
    } 
  })
  const [{ isDragging },drag] = useDrag({
    item: {type: ItemTypes.SLIDE, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1
  const border = (slide._id === activeSlide) ? '1px solid #42a5f5' : '1px solid #dbdbdb';
  drag(drop(ref))
  return (
    <div>
        <Card className={classes.slide} ref={ref} style={{opacity, border}} onClick={() => handleClick()}>
          <img ref={refs} id={activeSlide} src={slide.thumbnail} style={{width: '100%', height: 'auto'}} alt="slide thumbnail"/>
        </Card>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    activeSlide: state.presentation.get('active_slide'),
    activePresentation: state.presentation.get('active_presentation')
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
  changeSlideOrder: (dragIndex, hoverIndex) => dispatch(changeSlideOrder(dragIndex, hoverIndex)),
  updateSlide: (slideID, presentationID, data) => dispatch(updateSlide(slideID, presentationID, data))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slide)