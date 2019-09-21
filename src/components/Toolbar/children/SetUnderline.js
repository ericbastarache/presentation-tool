import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    activeButton: {
        backgroundColor: blue['100']
    }
}));

const SetUnderline = ({canvas}) => {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true);
    const [isUnderline, setIsUnderlined] = React.useState(false);

    const handleSelection = (event) => {
        if (event.target && event.target.type === 'i-text') {
            setDisabled(false);
            if (event.target.underline === true) {
                setIsUnderlined(true);
            } else {
                setIsUnderlined(false);
            }
        } else {
            setDisabled(true);
        }
    }

    const setUnderline = () => {
        if (canvas.getActiveObject().type && canvas.getActiveObject().type === 'i-text') {
            const textObj = canvas.getActiveObject();
              if (textObj.get('underline') === false) {
                textObj.set('underline', true);
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsUnderlined(true);
              } else {
                textObj.set('underline', false);
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsUnderlined(false);
              }
        }
    }

    React.useEffect(() => {
        if (canvas) {
            canvas.on({
                'selection:cleared' : handleSelection,
                'selection:created' : handleSelection,
                'selection:updated' : handleSelection,
            })
            return () => {
                canvas.off({ 
                    'selection:cleared' : handleSelection,
                    'selection:created' : handleSelection,
                    'selection:updated' : handleSelection,
                });
            };
        }
    }, [canvas])

    return (
        <Tooltip title="Underlined Text">
            <div>
                <IconButton 
                    className={(isUnderline) ? classes.activeButton : ''}
                    onClick={() => setUnderline()} 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    disabled={disabled}>
                    <FormatUnderlinedIcon />
                </IconButton>
                </div>
        </Tooltip>
        
    )
}

export default SetUnderline