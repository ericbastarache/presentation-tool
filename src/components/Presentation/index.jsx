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


class Presentation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeSlide: 0,
      currentSlide: 0
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.currentSlide !== nextProps.slides.toJS().length - 1) {
      this.setState({currentSlide: this.state.currentSlide + 1});
    } else {
      this.setState({currentSlide: nextProps.slides.toJS().length - 1});
    }
  }
  addSlide = () => {
    this.props.dispatch({type: 'CREATE_SLIDE', payload: {title: 'Title', subtitle: 'Subtitle'}});
  }
  setActiveSlide = (index) => () => {
    this.setState({currentSlide: index, activeSlide: index - 1});
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
          />
        </Grid>
        <Grid item xs={3}>
          {this.renderSlides()}
        </Grid>
        <Grid item xs={6}>
          <h1>Canvas</h1>
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
