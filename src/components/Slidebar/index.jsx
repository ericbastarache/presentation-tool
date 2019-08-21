import React from 'react'
import Slide from '../Slide'

const Slidebar = ({slides}) => {
    const imageRefs = React.useRef(slides.map(() => React.createRef()));
    const renderSlides = () => {
        return slides.map((slide, index) => {
            return <Slide 
            refs={imageRefs}
            key={slide._id} 
            index={index} 
            slide={slide}
            />
        })
    }
    return (
        <>
            {renderSlides()}
        </>
    )
}

export default Slidebar