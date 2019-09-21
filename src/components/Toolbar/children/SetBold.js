import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    activeButton: {
        backgroundColor: blue['100']
    }
}));

const SetBold = ({canvas}) => {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true);
    const [isBold, setIsBold] = React.useState(false);

    const handleSelection = (event) => {
        if (event.target && event.target.type === 'i-text') {
            setDisabled(false);
            if (event.target.fontWeight === 'bold') {
                setIsBold(true);
            } else {
                setIsBold(false);
            }
        } else {
            setDisabled(true);
        }
    }

    const setBold = () => {
        if (canvas.getActiveObject().type && canvas.getActiveObject().type === 'i-text') {
            const textObj = canvas.getActiveObject();
            if (textObj.get('fontWeight') === 'normal') {
                textObj.set('fontWeight', 'bold');
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsBold(true);
              } else {
                textObj.set('fontWeight', 'normal');
                canvas.fire('object:modified');
                canvas.renderAll();
                setIsBold(false);
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
        <Tooltip title="Bold Text">
            <div>
                <IconButton 
                    className={(Boolean(isBold)) ? classes.activeButton : ''}
                    onClick={() => setBold()} 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    disabled={Boolean(disabled)}>
                    <FormatBoldIcon />
                </IconButton>
                </div>
        </Tooltip>
        
    )
}

export default SetBold