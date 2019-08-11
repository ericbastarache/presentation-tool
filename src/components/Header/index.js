import React from 'react'
import { Grid } from '@material-ui/core'
import Toolbar from '../Toolbar/index'
import Presentationbar from '../Presentationbar/index'
import User from '../User/index'


export default class Header extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={4}>
                    <Toolbar addSlide={this.props.addSlide} toggleModal={this.props.toggleModal} deleteSlide={this.props.deleteSlide}/>
                </Grid>
                <Grid item xs={4}>
                    <Presentationbar toggleModal={this.props.toggleModal} isModalActive={this.props.isModalActive}/>
                </Grid>
                <Grid item xs={4}>
                    <User/>
                </Grid>
            </Grid>
        )
    }
}