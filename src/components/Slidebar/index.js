import React from 'react'
import Slide from '../Slide'

const Slidebar = ({slides}) => {
    const renderSlides = () => {
        if (slides.length > 0) {
        return slides[0].slides.map((slide, index) => {
            return <Slide 
            key={index} 
            index={index} 
            slide={slide}
            />
        })
    }
    }
    return (
        <>
            {renderSlides()}
        </>
    )
}

export default Slidebar