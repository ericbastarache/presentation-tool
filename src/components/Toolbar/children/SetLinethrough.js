import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormatStrikethroughIcon from '@material-ui/icons/StrikethroughS';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    activeButton: {
        backgroundColor: blue['100']
    }
}));

const SetLinethrough = ({canvas}) => {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true);
    const [isStrikethrough, setIsStrikethrough] = React.useState(false);

    const handleSelection = (event) => {
        if (event.target && event.target.type === 'i-text') {
            setDisabled(false);
            if (event.target.linethrough === true) {
                setIsStrikethrough(true);
            } else {
                setIsStrikethrough(false);
            }
        } else {
            setDisabled(true);
        }
    }

    const setLinethrough = () => {
        if (canvas.getActiveObject().type && canvas.getActiveObject().type === 'i-text') {
            const textObj = canvas.getActiveObject();
              if (textObj.get('linethrough') === false) {
                textObj.set('linethrough', true);
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsStrikethrough(true);
              } else {
                textObj.set('linethrough', false);
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsStrikethrough(false);
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
                    className={(isStrikethrough) ? classes.activeButton : ''}
                    onClick={() => setLinethrough()} 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    disabled={disabled}>
                    <FormatStrikethroughIcon />
                </IconButton>
                </div>
        </Tooltip>
        
    )
}

export default SetLinethrough