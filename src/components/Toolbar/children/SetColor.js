import React from 'react';
import { fabric } from 'fabric';
import { connect } from 'react-redux';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color'
import { setColor } from 'actions/index';

const useStyles = makeStyles(theme => ({
    color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
}));


const AddText = ({canvas, color, setColor}) => {
    const classes = useStyles();
    const [isColorPickerVisible, setIsColorPickerVisible] = React.useState(false);
    const [colorPickerDisplayColor, setColorPickerDisplayColor] = React.useState(color);

    const showColorPicker = () => {
        setIsColorPickerVisible(true)
    }

    const hideColorPicker = () => {
        setIsColorPickerVisible(false);
    }

    const handleColorChange = (selectedColor) => {
        const selection = canvas.getActiveObjects();
        selection.forEach(canvasObject => {
            switch(canvasObject.type) {
                case 'i-text':
                    canvasObject.set('fill', selectedColor.hex);
                    return;
                case 'circle':
                    canvasObject.set('fill', selectedColor.hex);
                    return;
                case 'rect':
                    canvasObject.set('fill', selectedColor.hex);
                    return;
                case 'triangle':
                    canvasObject.set('fill', selectedColor.hex);
                    return;
                default:
                    return;
            }
        })
        canvas.renderAll();
        canvas.trigger('object:modified');
        setColor(selectedColor.hex);
        setColorPickerDisplayColor(selectedColor.hex);
    }

    const handleSelection = (event) => {
        if (event.selected.length > 1) {
            const groupColor = event.selected[0].fill;
            let onlyOneColorInGroup = true;
            event.selected.forEach(selectedObject => {
                if (selectedObject.fill !== groupColor) {
                    const newColorPickerDisplayColor = "linear-gradient(to right, orange , yellow, green, cyan, blue, violet)";
                    setColorPickerDisplayColor(newColorPickerDisplayColor);
                    onlyOneColorInGroup = false;
                }
            })
            if (onlyOneColorInGroup) {
                setColorPickerDisplayColor(groupColor);
            }
        } else {
            setColorPickerDisplayColor(event.selected[0].fill);
        }
    }

    React.useEffect(() => {
        if (canvas) {
            canvas.on({
                'selection:created' : handleSelection,
                'selection:updated' : handleSelection,
            })
            return () => {
                canvas.off({ 
                    'selection:created' : handleSelection,
                    'selection:updated' : handleSelection,
                });
            };
        }
    }, [canvas])

    React.useEffect(() => {
        setColorPickerDisplayColor(color);
    }, [color])

    return (
        <div>
            <Tooltip title="Change Color">
            <div className={ classes.swatch } onClick={ showColorPicker }>
                <div className={ classes.color } style={{"background":colorPickerDisplayColor}}/>
            </div>
            </Tooltip>
            { isColorPickerVisible ? <div className={ classes.popover }>
            <div className={ classes.cover } onClick={ hideColorPicker }/>
                <SketchPicker color={ colorPickerDisplayColor } onChange={ handleColorChange } />
            </div> : null }
        </div>
    )
}

const mapStateToProps = state => ({
    color: state.presentation.get('color')
})
const mapDispatchToProps = dispatch => ({
    setColor: (color) => dispatch(setColor(color)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddText)