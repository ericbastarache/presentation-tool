import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider  } from 'react-dnd'
import Header from './containers/Header'
import Presentation from './containers/Presentation'


class App extends React.Component {

  render() {
    return (
        <div className="App">
          <DndProvider backend={HTML5Backend}>
              <Header/>
              <Presentation />
          </DndProvider>
        </div>

    );
  }
}

export default App