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

class Slide extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.activeSlide === nextProps.activeSlide) {
      return false;
    } else {
      return true;
    }
  }
  render () {
    console.log(this.props.activeSlide);
    return this.props.connectDragSource(
      <div>
        <Card
          onClick={() => this.props.onClick(this.props.slideNumber)}
          style={{border: this.props.isDragging ? "1px solid #f009" : "none"}}
        >
          <h1>{this.props.slide.title}</h1>
          <h4>{this.props.slide.subtitle}</h4>
          <h5>Index: {this.props.slide.position}</h5>
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