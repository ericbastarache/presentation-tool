import React from 'react'
import Slide from '../Slide'

const Slidebar = ({slides}) => {
    const renderSlides = () => {
        return slides.map((slide, index) => {
            return <Slide 
            key={index} 
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