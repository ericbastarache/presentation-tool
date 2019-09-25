import React from 'react';
import {
  Card
} from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { 
  setActiveSlide,  
  changeSlideOrder,
} from '../../actions'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  slide: {
    margin: theme.spacing(1)
  },
  slideNumber: {
    position: 'relative',
    left: '6px'
  }
}));

const Slide = ({index, slide, changeSlideOrder, setActiveSlide, activeSlide}) => {
  const classes = useStyles();
  const ref = React.useRef(null);

  const handleClick = () => {
    if (slide._id !== activeSlide) {
      setActiveSlide(slide._id)   
    }
  }

  const [, drop] = useDrop({
    accept: 'SLIDE',
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
    item: {type: 'SLIDE', index},
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
          <img src={slide.thumbnail} style={{width: '100%', height: 'auto'}} alt="slide thumbnail"/>
        </Card>
        <span className={classes.slideNumber}>{index + 1}</span>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    activeSlide: state.presentation.get('active_slide'),
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
  changeSlideOrder: (dragIndex, hoverIndex) => dispatch(changeSlideOrder(dragIndex, hoverIndex)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slide)