import React from 'react';
import { connect } from 'react-redux';
import { getNewSlide }  from 'actions/index';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const AddSlide = ({getNewSlide, activePresentation}) => {
    return (
        <Tooltip title="Add Slide">
            <IconButton variant="contained" size="small" onClick={() => getNewSlide(activePresentation)}>
                <AddIcon />
            </IconButton>
        </Tooltip>
    )
}

const mapStateToProps = state => ({
    activePresentation : state.presentation.get('active_presentation'),
})

const mapDispatchToProps = dispatch => ({
    getNewSlide: (activePresentation) => dispatch(getNewSlide(activePresentation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSlide)