import React from 'react'
import Slide from '../Slide'
import {
    Grid
  } from '@material-ui/core';

const Slidebar = ({slides, changeSlideOrder, setActiveSlide, activeSlide}) => {
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
            setActiveSlide={setActiveSlide}
            isActive={isActive}
            />
        })
    }
    return (
        <Grid item xs={3}>
            {renderSlides()}
        </Grid>
    )
}

export default Slidebar