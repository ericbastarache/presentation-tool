import React from 'react';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <button onClick={this.props.createSlide}>New Slide</button>
        <button onClick={this.props.deleteSlide}>Delete Slide</button>
      </div>
    )
  }
}

export default Toolbar;