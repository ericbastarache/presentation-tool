import React from 'react';
import {
  Card
} from '@material-ui/core';
import styled from 'styled-components';
import ItemTypes from '../../constants/index'
import { useDrag, useDrop } from 'react-dnd'

const Slide = ({index, title, subtitle,id, changeSlideOrder}) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.SLIDE,
    hover(item, monitor) {
      const selectedSlide = item.index;
      const hoverSlide = index;

      if (selectedSlide === hoverSlide) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.buttom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (selectedSlide < hoverSlide && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (selectedSlide > hoverSlide && hoverClientY > hoverMiddleY) {
          return
        }
      changeSlideOrder(selectedSlide, hoverSlide)
      item.index = selectedSlide;
    } 
  })
  const [{ isDragging },drag] = useDrag({
    item: {type: ItemTypes.SLIDE, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1
  drop(drag(ref))
  return (
    <div>
        <Card
          ref={ref} style={{opacity}}
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