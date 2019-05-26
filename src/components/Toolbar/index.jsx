import React from 'react';
import {
  connect
} from 'react-redux';
import Button from 'components/Button';
import {
  Dialog,
  Toolbar as ToolBar,
  AppBar,
  Card
} from '@material-ui/core';
import { 
  CREATE_SLIDE 
} from 'types';
import {
  uniqid 
} from 'lib/helpers';

class Toolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPresentationModal: false,
    }
  }

  loadPresentation = () => {
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
              <Button
                name='close-modal'
                onClick={this.closeModal}
              >
                X
              </Button>
            </ToolBar>
          </AppBar>
          { this.props.presentations.map(presentation => {
            return (
              <Card>
                {presentation.title}
              </Card>
            )
          })}
        </Dialog>
      )
    }
  }
  render () {
    return (
      <>
        {this.props.children({
          loadPresentation: this.loadPresentation,
          addSlide: this.addNewSlide
        })}
      {this.renderPresentationModal()}
    </>
    )
  }
}

const mapStateToProps = state => {
  return {
    presentations: state.presentation.get('presentations')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSlide () {
      return dispatch({ type: CREATE_SLIDE, payload: { id: uniqid(), title: 'Title', subtitle: 'Subtitle' } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);