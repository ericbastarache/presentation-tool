import React from 'react';
import {
  Button
} from '@material-ui/core';

const Toolbar = ({getNewSlide, deleteSlide, toggleModal, activePresentation}) => {
  return (
    <div>
      <Button variant="contained" size="small" onClick={() => getNewSlide(activePresentation)}>
        Add Slide
      </Button>
      <Button variant="contained" size="small" onClick={deleteSlide}>
        Delete Slide
      </Button>
      <Button variant="contained" size="small" onClick={toggleModal}>
        Presentations
      </Button>
    </div>
  )
}

export default Toolbar