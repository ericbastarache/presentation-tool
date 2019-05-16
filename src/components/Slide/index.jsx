import React from 'react';
import {
  Card
} from '@material-ui/core';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';

const slideSource = {
  beginDrag(props) {
    return {}
  }
}

export const ActiveSlide = styled(Card)`
  box-shadow: 0 0 3px blue !important;
`;

class Slide extends React.Component {
  render () {
    return this.props.connectDragSource(
      <div>
        <Card
          activeSlide={this.props.currentSlide}
          onClick={() => this.props.onClick(this.props.slideNumber)}
        >
          <h1>{this.props.slide.title}</h1>
          <h4>{this.props.slide.subtitle}</h4>
        </Card>
      </div>
    )
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
export default DragSource('SLIDE', slideSource, collect)(Slide);