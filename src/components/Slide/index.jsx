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
  saveSlide,
} from '../../actions'
import { SlideContext } from './context'

const Slide = ({index, slide, changeSlideOrder, setActiveSlide, activeSlide}) => {
  const ref = React.useRef(null);
  const canvas = React.useContext(SlideContext)
  const handleClick = () => {
    saveSlide(activeSlide, canvas.getCanvas().toJSON())
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
  drop(drag(ref))
  return (
    <div>
        <Card
          ref={ref} style={{opacity, border}} onClick={() => handleClick()}
        >
          <h5>Position: {index}</h5>
          <h5>ID: {slide._id}</h5>
        </Card>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    activeSlide: state.presentation.get('active_slide')
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
  changeSlideOrder: (selectedSlide, hoverSlide) => dispatch(changeSlideOrder(selectedSlide, hoverSlide)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slide)