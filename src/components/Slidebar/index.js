import React from 'react'
import Slide from '../Slide'

const Slidebar = ({slides, changeSlideOrder, setActiveSlide, activeSlide, handleSlideOnClick}) => {
    const renderSlides = () => {
        return slides.map((slide, index) => {
            let isActive = (slide.id === activeSlide) ? true : false;
            return <Slide 
            key={slide.id} 
            index={index} 
            title={slide.title} 
            subtitle={slide.subtitle} 
            id={slide.id} 
            changeSlideOrder={changeSlideOrder}
            isActive={isActive}
            handleSlideOnClick={() => handleSlideOnClick(slide.id)}
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