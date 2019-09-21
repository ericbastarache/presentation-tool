import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        margin: theme.spacing(1)
    },
    wrapper: {
        display: 'flex'
    }
}));

const SetDirection = ({ canvas }) => {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true);

    const handleSelection = (event) => {
        if (!!event.target) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const setDirection = (direction) => {
        if (!!canvas.getActiveObject()) {
            if (direction === 'front') {
                canvas.getActiveObject().bringToFront();
                canvas.fire('object:modified');
                canvas.renderAll();
            }
            if (direction === 'back') {
                canvas.getActiveObject().sendToBack();
                canvas.fire('object:modified');
                canvas.renderAll();
            }
        }
    }

    React.useEffect(() => {
        if (canvas) {
            canvas.on({
                'selection:cleared': handleSelection,
                'selection:created': handleSelection,
                'selection:updated': handleSelection,
            })
            return () => {
                canvas.off({
                    'selection:cleared': handleSelection,
                    'selection:created': handleSelection,
                    'selection:updated': handleSelection,
                });
            };
        }
    }, [canvas])

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttonContainer}>
                <Tooltip title="Bring to Front">
                    <div>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={disabled}
                            onClick={() => setDirection('front')}
                        >
                            <FlipToFrontIcon />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
            <div className={classes.buttonContainer}>
                <Tooltip title="Send to Back">
                    <div>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={disabled}
                            onClick={() => setDirection('back')}
                        >
                            <FlipToBackIcon />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default SetDirection