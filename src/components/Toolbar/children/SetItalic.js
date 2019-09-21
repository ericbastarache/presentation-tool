import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    activeButton: {
        backgroundColor: blue['100']
    }
}));

const SetBold = ({canvas}) => {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true);
    const [isItalic, setIsItalic] = React.useState(false);

    const handleSelection = (event) => {
        if (event.target && event.target.type === 'i-text') {
            setDisabled(false);
            if (event.target.fontStyle === 'italic') {
                setIsItalic(true);
            } else {
                setIsItalic(false);
            }
        } else {
            setDisabled(true);
        }
    }

    const setItalic = () => {
        if (canvas.getActiveObject().type && canvas.getActiveObject().type === 'i-text') {
            const textObj = canvas.getActiveObject();
              if (textObj.get('fontStyle') === 'normal') {
                textObj.set('fontStyle', 'italic');
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsItalic(true);
              } else {
                textObj.set('fontStyle', 'normal');
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsItalic(false);
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
        <Tooltip title="Italic Text" disableHoverListener={disabled}>
            <div>
                <IconButton 
                    className={(isItalic) ? classes.activeButton : ''}
                    onClick={() => setItalic()} 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    disabled={disabled}>
                    <FormatItalicIcon />
                </IconButton>
                </div>
        </Tooltip>
        
    )
}

export default SetBold