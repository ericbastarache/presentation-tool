import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider  } from 'react-dnd'
import Presentation from './containers/Presentation'


class App extends React.Component {

  render() {
    return (
        <div className="App">
          <DndProvider backend={HTML5Backend}>
              <Presentation />
          </DndProvider>
        </div>

    );
  }
}

export default App