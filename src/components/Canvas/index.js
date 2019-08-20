import React from 'react';

const Canvas = React.forwardRef((props, ref) => (
  <>
    <canvas width='800px' height='400px' ref={ref}/>
  </>
));

export default Canvas;


