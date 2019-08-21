import React from 'react';
import Presentation from 'containers/Presentation';
import { DndProvider  } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const Editor = () => (
  <DndProvider backend={HTML5Backend}>
    <Presentation />
  </DndProvider>
)

export default Editor;