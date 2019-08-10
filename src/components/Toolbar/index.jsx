import React from 'react';
import {
  Button
} from '@material-ui/core';

const Toolbar = ({addSlide, toggleModal}) => {
  return (
    <div>
      <Button variant="contained" onClick={addSlide}>
        Add Slide
      </Button>
      <Button variant="contained" onClick={toggleModal}>
        Presentations
      </Button>
    </div>
  )
}

export default Toolbar