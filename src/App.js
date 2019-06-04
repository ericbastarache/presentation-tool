import React from 'react';
import Slide from 'components/Slide';
import Presentation from 'components/Presentation';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Presentation>
          {({
            slides,
            setActive,
            presentation,
            activeSlide
          }) => {
            return (
              <>
                {slides.map((slide, index) => {
                  return (
                    <Slide
                      onClick={() => setActive(slide.id)}
                      key={`slide-${Math.random(0, 10000)}`}
                      slide={slide}
                      position={index}
                      slideNumber={slide.id}
                      activeSlide={activeSlide}
                    />
                  )
                })}
              </>
            )
          }}
        </Presentation>
      </div>
    );
  }
}

export default App;
