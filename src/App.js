import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider  } from 'react-dnd'
import {Grid} from '@material-ui/core'
import Header from './containers/Header'
import Slidebar from './containers/Slidebar'
import Presentation from './containers/Presentation'

class App extends React.Component {

  render() {
    return (
        <div className="App">
          <DndProvider backend={HTML5Backend}>
              <Header/>
            <Grid container>
                <Slidebar />
                <Grid item xs={8}>
                  <Presentation />
                </Grid>
            </Grid>
          </DndProvider>
        </div>

    );
  }
}

export default App