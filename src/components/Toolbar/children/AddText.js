import React from 'react';
import { fabric } from 'fabric';
import { connect } from 'react-redux';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import TextFormatIcon from '@material-ui/icons/TextFormat';


const AddText = ({canvas, slideCount}) => {

    const addText = () => {
        let text = new fabric.IText('Edit Me')
        canvas.add(text)
    }

    return (

        <Tooltip title="Add Text">
            <>
                <IconButton onClick={() => addText()} variant="contained" size="small" color="primary" disabled={!Boolean(slideCount)}>
                    <TextFormatIcon />
                </IconButton>
            </>
        </Tooltip>
    )
}

const mapStateToProps = state => ({
    slideCount : state.presentation.get('slide_count'),
})

export default connect(
    mapStateToProps
)(AddText)