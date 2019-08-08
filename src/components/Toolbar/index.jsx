import React from 'react';
import Button from 'components/Button';
import {
  Dialog,
  Toolbar as ToolBar,
  AppBar,
  Grid
} from '@material-ui/core';

export default class Toolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPresentationModal: false,
    }
  }

  showModal = () => {
    this.setState({showPresentationModal: !this.state.showPresentationModal});
  }

  addNewSlide = () => {
    return this.props.addSlide();
  }

  closeModal = () => {
    this.setState({showPresentationModal: false});
  }

  renderPresentationModal () {
    if (this.state.showPresentationModal) {
      return (
        <Dialog fullScreen open={this.state.showPresentationModal} onClose={this.closeModal}>
          <AppBar>
            <ToolBar>
              <Button name='close-modal' onClick={this.closeModal}>
                X
              </Button>
            </ToolBar>
          </AppBar>
        </Dialog>
      )
    } else {
      return (
        <div>
          <Button name='new-slide' onClick={this.props.addSlide}>
            Add Slide
          </Button>
          <Button onClick={this.showModal}>
            Modal
          </Button>
        </div>
      )
    }
  }
  render () {
    return (
        <Grid item xs={12}>
          {this.renderPresentationModal()}
        </Grid>
    )
  }
}