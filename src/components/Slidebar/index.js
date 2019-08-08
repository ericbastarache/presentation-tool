import React from 'react'
import Slide from '../Slide'
import {
    Grid
  } from '@material-ui/core';

export default class Sidebar extends React.Component {

    render() {
        const slides = this.props.slides.map((slide, index) => {
            return <Slide 
                        key={slide.id} 
                        index={index} 
                        title={slide.title} 
                        subtitle={slide.subtitle} 
                        id={slide.id} 
                        changeSlideOrder={this.props.changeSlideOrder}
                        onClick={this.props.setActiveSlide}
                        />
        })
        return (
                <Grid item xs={3}>
                    {slides}
                </Grid>
        )
    }
}