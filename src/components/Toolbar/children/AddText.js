import React from 'react';
import { fabric } from 'fabric';
import { connect } from 'react-redux';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import {ReactComponent as AddTextIcon} from 'media/icons/add_text_icon.svg';
import SvgIcon from '@material-ui/core/SvgIcon';


const AddText = ({canvas, slideCount, color}) => {

    const addText = () => {
        let text = new fabric.IText('Edit Me', {fill: color})
        canvas.add(text);
        canvas.fire('object:modified');
        canvas.renderAll();
    }

    return (
        <Tooltip title="Add Text">
            <div>
                <IconButton onClick={() => addText()} variant="contained" size="small" color="primary" disabled={!Boolean(slideCount)}>
                    <SvgIcon>
                        <AddTextIcon />
                    </SvgIcon>
                </IconButton>
            </div>
        </Tooltip>
    )
}

const mapStateToProps = state => ({
    slideCount : state.presentation.get('slide_count'),
    color: state.presentation.get('color')
})

export default connect(
    mapStateToProps
)(AddText)