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
      lastActiveSlide: 0,
      currentSlide: 0,
    }
    this.canvasEl = React.createRef();
    this.canvas = null;
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.currentSlide !== nextProps.slides.toJS().length - 1) {
      this.setState({currentSlide: this.state.currentSlide + 1, activeSlide: this.state.activeSlide + 1 ,lastActiveSlide: this.state.lastActiveSlide + 1});
    } else {
      this.setState({currentSlide: nextProps.slides.toJS().length - 1, lastActiveSlide: this.state.lastActiveSlide - 1});
    }
  }
  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasEl.current);
    this.canvas.clear();
    this.updateCanvas();
  }
  addSlide = () => {
    this.props.dispatch({type: 'CREATE_SLIDE', payload: {title: 'Title', subtitle: 'Subtitle', data:null}});
  }
  deleteSlide = () => {
    this.props.dispatch({type: 'DELETE_SLIDE', payload:{key:this.state.activeSlide}})
  }
  saveSlide = () => {
    let slideCanvasData = JSON.stringify(this.canvas.toJSON());
    this.props.dispatch({type: 'SAVE_SLIDE', payload:{key:this.state.lastActiveSlide, data:slideCanvasData}});
  }
  loadSlide = (key) => {
    let slideData = false;
    this.props.slides.toJS().map((slide, index) => {
      if (key === index)
        slideData = slide.data;
    })
    this.canvas.loadFromJSON(JSON.parse(slideData));
  }
  updateCanvas() {
    let slideData = this.props.slides.toJS().filter((slide, index) => {if (index === this.state.activeSlide) return slide});
    if (slideData[0].data !== null) {
      this.loadSlide(this.state.activeSlide);
    } else {
      let title = new fabric.IText(slideData[0].title, {
        fontSize: 48,
        textAlign: 'center',
      });
      let subtitle = new fabric.IText(slideData[0].subtitle, {
        fontSize: 24,
        textAlign: 'center'
      });
      this.canvas.add(title);
      this.canvas.add(subtitle);
    }
  }
  setActiveSlide = (index) => () => {
    this.setState({currentSlide: index, activeSlide: index, lastActiveSlide: this.state.activeSlide}, () => { 
      this.saveSlide();
      this.canvas.clear(); 
      this.updateCanvas(); 
    });
  }

  renderSlides = () => {
    return this.props.slides.toJS().map((slide, index) => {
      slide.position = index.toString();
      return this.state.currentSlide === index ?
      (
        <ActiveSlide
          key={index}
          activeSlide={this.state.activeSlide}
          slide={slide}
          onClick={this.setActiveSlide(index)}
        >
          <h1>{slide.title}</h1>
          <h4>{slide.subtitle}</h4>
          <span>Index: {slide.position}</span>
        </ActiveSlide>
      ) :
      (
        <Slide
          key={index}
          activeSlide={this.state.activeSlide}
          slide={slide}
          onClick={this.setActiveSlide(index)}
        >
          <h1>{slide.title}</h1>
          <h4>{slide.subtitle}</h4>
          <span>Index: {slide.position}</span>
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
