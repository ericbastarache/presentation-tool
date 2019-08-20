import React from 'react';
import {
  Card
} from '@material-ui/core';
import ItemTypes from '../../constants/index'
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import { 
  setActiveSlide,  
  changeSlideOrder,
  updateSlide,
} from '../../actions'
import { SlideContext } from './context'

const Slide = ({index, slide, changeSlideOrder, setActiveSlide, activeSlide, activePresentation, updateSlide}) => {
  const ref = React.useRef(null);
  const canvasEl = React.createRef(null);
  const canvas = React.useContext(SlideContext)
  const [src, setSrc] = React.useState(null)

  const handleClick = () => {
    updateSlide(activeSlide, activePresentation, canvas.getCanvas().toJSON())
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
  const border = (slide._id === activeSlide) ? '1px solid blue' : '1px solid #dbdbdb';
  drag(drop(ref))
  return (
    <div>
        <Card ref={ref} style={{opacity, border}} onClick={() => handleClick()}>
          <img src={slide.thumbnail} style={{width: '100%', height: 'auto'}} alt="slide thumbnail"/>
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