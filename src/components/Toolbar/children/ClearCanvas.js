import React from 'react';
import { connect } from 'react-redux';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';


const ClearCanvas = ({ canvas, slideCount }) => {

    const clearCanvas = () => {
        canvas.clear();
        canvas.renderAll();
        canvas.fire('object:modified');
    }
    return (
        <Tooltip title="Clear canvas">
            <div>
                <IconButton variant="contained" size="small" onClick={() => clearCanvas()} disabled={!Boolean(slideCount)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </Tooltip>
    )
}

const mapStateToProps = state => ({
    slideCount: state.presentation.get('slide_count'),
})

export default connect(
    mapStateToProps
)(ClearCanvas)