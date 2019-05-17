import React from 'react';
import Toolbar from 'components/Toolbar';
import {
  Grid,
} from '@material-ui/core';
import Slide, { ActiveSlide } from 'components/Slide';
import { 
  connect 
} from 'react-redux';
import {
  compose
} from 'redux';
import withDragDrop from 'lib/withDragDrop';
import { fabric } from 'fabric';


class Presentation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeSlide: 0,
      currentSlide: 0
    }
    this.canvasEl = React.createRef();
    this.canvas = null;
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.currentSlide !== nextProps.slides.toJS().length - 1) {
      this.setState({currentSlide: this.state.currentSlide + 1});
    } else {
      this.setState({currentSlide: nextProps.slides.toJS().length - 1});
    }
  }
  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasEl.current);
  }
  addSlide = () => {
    this.props.dispatch({type: 'CREATE_SLIDE', payload: {title: 'Title', subtitle: 'Subtitle'}});
  }
  updateCanvas() {
    let currentSlide = this.props.slides.toJS().filter((slide, index) => {if (index === this.state.currentSlide) return slide});
    let title = new fabric.IText(currentSlide[0].title, {
      fontSize: 48,
      textAlign: 'center',
    });
    let subtitle = new fabric.IText(currentSlide[0].subtitle, {
      fontSize: 24,
      textAlign: 'center'
    });
    this.canvas.add(title);
    this.canvas.add(subtitle);
  }
  setActiveSlide = (index) => () => {
    this.setState({currentSlide: index, activeSlide: index - 1});
    this.updateCanvas();
  }
  deleteSlide = () => {
    this.props.dispatch({type: 'DELETE_SLIDE', payload: this.state.activeSlide})
  }
  renderSlides = () => {
    return this.props.slides.toJS().map((slide, index) => {
      return this.state.currentSlide === index ?
      (
        <ActiveSlide
          key={index}
          activeSlide={this.state.currentSlide}
          slide={slide}
          onClick={this.setActiveSlide(index)}
        >
          <h1>{slide.title}</h1>
          <h4>{slide.subtitle}</h4>
        </ActiveSlide>
      ) :
      (
        <Slide
          key={index}
          activeSlide={this.state.currentSlide}
          slide={slide}
          onClick={this.setActiveSlide(index)}
        >
          <h1>{slide.title}</h1>
          <h4>{slide.subtitle}</h4>
        </Slide>
      );
    })
  }
  render () {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Toolbar
            createSlide={this.addSlide}
            deleteSlide={this.deleteSlide}
          />
        </Grid>
        <Grid item xs={3}>
          {this.renderSlides()}
        </Grid>
        <Grid item xs={6}>
          <h1>Canvas</h1>
          <canvas ref={this.canvasEl} width="640" height="400"/>
        </Grid>
        <Grid item xs={3}>
          <h1>Theme</h1>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    presentation: state.presentation.get('presentation'),
    slides: state.presentation.get('slides')
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDragDrop
)(Presentation);
