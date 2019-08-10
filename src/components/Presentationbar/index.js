import React from 'react';
import {
  Dialog,
  Toolbar as ToolBar,
  AppBar,
  Grid,
  Button
} from '@material-ui/core';

const Presentationbar = ({toggleModal, isModalActive}) => {
  const showModal = ()  => {
    if (isModalActive) {
      return (
        <Grid item xs={12}>
          <Dialog fullScreen open={isModalActive}>
            <AppBar>
              <ToolBar>
                <Button variant="contained" color="secondary" onClick={toggleModal}>
                  X
                </Button>
              </ToolBar>
            </AppBar>
          </Dialog>
        </Grid>
      )
    } else {
      return null
    }
  }
  return (
    <div>
    {showModal()}
    </div>
  )
}

export default Presentationbar