import React from 'react';
import {
  Button
} from '@material-ui/core';

const Toolbar = ({addSlide, deleteSlide, toggleModal}) => {
  return (
    <div>
      <Button variant="contained" size="small" onClick={addSlide}>
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