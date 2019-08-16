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
  Radio,
  TextField,
  makeStyles 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#4B8DF8'
  },
  radio: {
    '&$checked': {
    },
    color: '#ffffff'
  },
  checked: {}
}));

const Presentationbar = ({toggleModal, 
                          isModalActive, 
                          presentations, 
                          activePresentation, 
                          setActivePresentation,
                          setPresentationTitle,
                          createPresentation
                        }) => {
  const classes = useStyles();
  const handleChange = (event, id) => {
    setPresentationTitle(id, event.target.value)
  }


  const renderPresentations = () => {
    let presentationsToRender = new Array()
    presentations.forEach((presentation, index) => {
      if (presentation.id === activePresentation) {
        presentationsToRender.push(
        <Grid item xs={3} style={{padding: '22px'}} key={presentation.id}> 
          <Card style={{border: '2px solid #4285f4', padding: '60px 20px'}} raised={true}>
            <Tooltip title="Edit" placement="bottom">
              <Typography 
                variant="h3" 
                align="center"
                >
                {presentation.title}
              </Typography>
            </Tooltip>
            <Grid container justify="center">
              <TextField
                  id={"title-" + index}
                  label="Title"
                  value={presentation.title}
                  onChange={(event) => handleChange(event, presentation.id)}
                  style={{marginTop: '30px'}}
                />
            </Grid>
          </Card>
          <Grid container justify="center">
            <Radio
              checked={true}
              value={presentation.id}
              color="primary"
              name={"select-presentation-"+presentation.id}
              inputProps={{ 'aria-label': 'select-presentation' }}
              classes={{root: classes.radio, checked: classes.checked}}
            />
          </Grid>
        </Grid>
        )  
      } 
      else {
        presentationsToRender.push(
          <Grid item xs={3} style={{padding: '22px'}} key={presentation.id}>
          <Card style={{border: '2px solid #ffffff', padding: '60px 0'}} raised={false}>
            <Tooltip title="Edit" placement="bottom">
              <Typography 
                variant="h3" 
                align="center"
                >
                {presentation.title}
              </Typography>
            </Tooltip>
            <Grid container justify="center">
              <TextField
                  id={"title-" + index}
                  label="Title"
                  value={presentation.title}
                  style={{marginTop: '30px'}}
                  onChange={(event) => handleChange(event, presentation.id)}
                />
            </Grid>
          </Card>
          <Grid container justify="center">
            <Radio
              checked={false}
              onChange={() => setActivePresentation(presentation.id)}
              value={presentation.id}
              color="secondary"
              name={"select-presentation-"+presentation.id}
              inputProps={{ 'aria-label': 'select-presentation' }}
              classes={{root: classes.radio, checked: classes.checked}}
            />
          </Grid>
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
            <AppBar style={{backgroundColor: '#1976d2'}}>
              <ToolBar style={{justifyContent: "space-between"}}>
                <Button variant="contained" color="primary" onClick={() => createPresentation()}>
                  Add Presentation
                </Button>
                <Button variant="contained" color="secondary" onClick={toggleModal}>
                  X
                </Button>
              </ToolBar>
              <Grid container>
                {renderPresentations()}
              </Grid>
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