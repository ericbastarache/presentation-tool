import React from 'react';
import {
  Dialog,
  Toolbar as ToolBar,
  AppBar,
  Grid,
  Button,
  Card,
  Typography,
  Tooltip,
  makeStyles,
  TextField
} from '@material-ui/core';

const Presentationbar = ({toggleModal, 
                          isModalActive, 
                          presentations, 
                          activePresentation, 
                          setActivePresentation,
                          setPresentationTitle
                        }) => {
  const [ isTextFieldVisible, setTextFieldVisibility] = React.useState(false)
  const [ isTitleVisible, setTitleVisibility] = React.useState(true)

  const handleOnClick = (event) => {
    event.stopPropagation()
    setTitleVisibility(false)
    setTextFieldVisibility(true)
  }

  const handleChange = (event, id) => {
    setPresentationTitle(id, event.target.value)
  }

  const handleOnBlur = () => {
    setTextFieldVisibility(false)
    setTitleVisibility(true)
  }

  const renderPresentations = () => {
    let presentationsToRender = new Array()
    presentations.forEach((presentation, index) => {
      if (presentation.id === activePresentation) {
        presentationsToRender.push(
        <Grid item xs={3} style={{padding: '22px'}} key={presentation.id} onClick={(event) => handleOnClick(event)}>
          <Card style={{border: '2px solid #4285f4', padding: '60px 0'}} raised={true}>
            <Tooltip title="Edit" placement="bottom">
              <Typography 
                variant="h3" 
                align="center"
                onClick={(event) => handleOnClick(event)} 
                style={{display: (isTitleVisible) ? 'block' : 'none'}}>
                {presentation.title}
              </Typography>
            </Tooltip>
            <Grid container justify="center">
              <TextField
                  id={"title-" + index}
                  label="Title"
                  style={{display: (!isTextFieldVisible) ? 'none' : 'inline-flex'}}
                  value={presentation.title}
                  onChange={(event) => handleChange(event, presentation.id)}
                  onBlur={() => handleOnBlur()}
                />
            </Grid>
          </Card>
        </Grid>
        )  
      } 
      else {
        presentationsToRender.push(
          <Grid item xs={3} style={{padding: '22px'}} key={presentation.id} onClick={() => setActivePresentation(presentation.id)}>
          <Card style={{border: '2px solid #ffffff', padding: '60px 0'}} raised={false}>
            <Tooltip title="Edit" placement="bottom">
              <Typography 
                variant="h3" 
                align="center"
                onClick={(event) => handleOnClick(event)} 
                style={{display: (isTitleVisible) ? 'block' : 'none'}}>
                {presentation.title}
              </Typography>
            </Tooltip>
            <Grid container justify="center">
              <TextField
                  id={"title-" + index}
                  label="Title"
                  style={{display: (!isTextFieldVisible) ? 'none' : 'inline-flex'}}
                  value={presentation.title}
                  onChange={(event) => handleChange(event, presentation.id)}
                  onBlur={() => handleOnBlur()}
                />
            </Grid>
          </Card>
        </Grid>
        )
      }
    })
    return presentationsToRender
  }
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
              {renderPresentations()}
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