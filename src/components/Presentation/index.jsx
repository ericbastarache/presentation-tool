import React from 'react';
import Toolbar from 'components/Toolbar';
import Button from 'components/Button';
import {
  Grid,
} from '@material-ui/core';
import { 
  connect 
} from 'react-redux';
import {
  compose
} from 'redux';
import withDragDrop from 'lib/withDragDrop';
import { fabric } from 'fabric';


class Presentation extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      activeSlide: null,
    }
    this.canvasEl = React.createRef();
    this.canvas = null;
  }
  componentWillMount() {
    this.canvas = new fabric.Canvas(this.canvasEl.current);
  }
  componentWillReceiveProps(nextProps) {
    
  }

  setActiveSlide = (id) => {
    this.setState({activeSlide: id});
  }
  render () {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Toolbar
          >
            {({
              addSlide,
              loadPresentation
            }) => {
              return (
                <>
                  <Button
                    name='new-slide'
                    onClick={addSlide}
                  >
                    Add Slide
                  </Button>
                  <Button
                    onClick={loadPresentation}
                  >
                    Modal
                  </Button>
                </>
              )
            }}
          </Toolbar>
        </Grid>
        <Grid item xs={3}>
          {this.props.children({
            slides: this.props.slides,
            setActive: this.setActiveSlide,
            presentation: this.props.presentation,
            activeSlide: this.state.activeSlide,
          })}
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
