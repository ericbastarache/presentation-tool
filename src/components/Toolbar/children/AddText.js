import React from 'react';
import { fabric } from 'fabric';
import { connect } from 'react-redux';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import {ReactComponent as AddTextIcon} from 'media/icons/add_text_icon.svg';
import SvgIcon from '@material-ui/core/SvgIcon';


const AddText = ({canvas, slideCount}) => {

    const addText = () => {
        let text = new fabric.IText('Edit Me')
        canvas.add(text)
    }

    return (
        <Tooltip title="Add Text">
            <>
                <IconButton onClick={() => addText()} variant="contained" size="small" color="primary" disabled={!Boolean(slideCount)}>
                    <SvgIcon>
                        <AddTextIcon />
                    </SvgIcon>
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