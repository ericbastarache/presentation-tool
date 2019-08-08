import React from 'react'
import Slidebar from 'containers/Slidebar'
import Toolbar from 'containers/Toolbar'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider  } from 'react-dnd'
import Presentation from 'containers/Presentation'
import {Grid} from '@material-ui/core'

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <DndProvider backend={HTML5Backend}>
            <Grid container>
              <Toolbar />
              <Slidebar />
              <Presentation />
            </Grid>
          </DndProvider>
        </div>

    );
  }
}

export default App