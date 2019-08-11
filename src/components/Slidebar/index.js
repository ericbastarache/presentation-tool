import React from 'react'
import Slide from '../Slide'
import {
    Grid
  } from '@material-ui/core';

const Slidebar = ({slides, changeSlideOrder}) => {
    const renderSlides = () => {
        return slides.map((slide, index) => {
            return <Slide 
            key={slide.id} 
            index={index} 
            title={slide.title} 
            subtitle={slide.subtitle} 
            id={slide.id} 
            changeSlideOrder={changeSlideOrder}/>
        })
    }
    return (
        <Grid item xs={3}>
            {renderSlides()}
        </Grid>
    )
}

export default Slidebar