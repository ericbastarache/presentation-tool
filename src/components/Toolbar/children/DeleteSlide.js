import React from 'react';
import { connect } from 'react-redux';
import { deleteSlide }  from 'actions/index';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const DeleteSlide = ({slideCount, deleteSlide, activeSlide, token, activePresentation}) => {
    const handleDelete = () => {
        if (slideCount > 0) {
            deleteSlide(token, activeSlide, activePresentation)
        }
    }
    return (
        <Tooltip title="Delete Slide">
            <div>
                <IconButton variant="contained" size="small" onClick={handleDelete} disabled={!Boolean(slideCount)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </Tooltip>
    )
}

const mapStateToProps = state => ({
    slideCount : state.presentation.get('slide_count'),
    activeSlide: state.presentation.get('active_slide'),
    activePresentation: state.presentation.get('active_presentation'),
    token: state.user.get('token')
})

const mapDispatchToProps = dispatch => ({
    deleteSlide: (token, activeSlide, activePresentation) => dispatch(deleteSlide(token, activeSlide, activePresentation)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteSlide)