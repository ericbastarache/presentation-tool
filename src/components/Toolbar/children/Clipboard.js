import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        margin: theme.spacing(1)
    },
    wrapper: {
        display: 'flex'
    }
}));

const Clipboard = ({ canvas, slideCount }) => {
    const classes = useStyles();
    const [copyDisabled, setCopyDisabled] = React.useState(true);
    const [pasteDisabled, setPasteDisabled] = React.useState(true);
    const [clipboard, setClipboard] = React.useState(null);


    const handleSelection = (event) => {
        if (!!event.target) {
            setCopyDisabled(false);
        } else {
            setCopyDisabled(true);
        }
    }

    React.useEffect(() => {
        if (Boolean(slideCount) && Boolean(clipboard)) {
            setPasteDisabled(false);
        } else {
            setPasteDisabled(true);
        }
    }, [clipboard, slideCount])

    const copy = () => {
        if (!!canvas.getActiveObject()) {
            canvas.getActiveObject().clone((cloned) => {
                setClipboard(cloned);
            });
        }
    }

    const paste = () => {
        clipboard.clone((obj) => {
            canvas.discardActiveObject();
            obj.set({
                left: obj.left + 10,
                top: obj.top + 10,
                evented: true,
            });
            if (obj.type === 'activeSelection') {
                obj.canvas = canvas;
                obj.forEachObject(newObj => {
                    canvas.add(newObj);
                });
                obj.setCoords();
            } else {
                canvas.add(obj);
            }
            canvas.setActiveObject(obj);
            canvas.requestRenderAll();
            canvas.trigger('object:modified');
        });
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
                <Tooltip title="Copy">
                    <div>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={copyDisabled}
                            onClick={() => copy()}
                        >
                            <FontAwesomeIcon icon={faCopy} />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
            <div className={classes.buttonContainer}>
                <Tooltip title="Paste">
                    <div>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={pasteDisabled}
                            onClick={() => paste()}
                        >
                            <FontAwesomeIcon icon={faPaste} />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    slideCount: state.presentation.get('slide_count'),
})

export default connect(
    mapStateToProps
)(Clipboard)