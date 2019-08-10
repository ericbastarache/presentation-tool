import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider  } from 'react-dnd'
import {Grid} from '@material-ui/core'
import Header from './containers/Header'

class App extends React.Component {

  render() {
    return (
        <div className="App">
          <DndProvider backend={HTML5Backend}>
            <Grid container>
              <Header/>
            </Grid>
          </DndProvider>
        </div>

    );
  }
}

export default App