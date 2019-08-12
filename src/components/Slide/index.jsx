import React from 'react';
import {
  Card
} from '@material-ui/core';
import ItemTypes from '../../constants/index'
import { useDrag, useDrop } from 'react-dnd'

const Slide = ({index, title, subtitle,id, changeSlideOrder, setActiveSlide, isActive, handleSlideOnClick}) => {
  const ref = React.useRef(null);
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
  const border = isActive ? '1px solid blue' : '1px solid #dbdbdb';
  drop(drag(ref))
  return (
    <div>
        <Card
          ref={ref} style={{opacity, border}} onClick={ handleSlideOnClick}
        >
          <h1>{title}</h1>
          <h4>{subtitle}</h4>
          <h5>Position: {index}</h5>
          <h5>ID: {id}</h5>
        </Card>
      </div>
  )
}

export default Slide;