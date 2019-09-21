import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setSlides } from 'actions/index';

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        margin: theme.spacing(1)
    },
    wrapper: {
        display: 'flex'
    }
}));

const UndoRedo = ({ canvas, slideCount, slides, activeSlide, setSlides }) => {

    const classes = useStyles();
    const [undoDisabled, setUndoDisabled] = React.useState(true);
    const [redoDisabled, setRedoDisabled] = React.useState(true);
    const [history, setHistory] = React.useState([]);
    const [historyIndex, setHistoryIndex] = React.useState(null);

    const undo = () => {
        if (historyIndex === null) {
            const index = history.length - 2;
            setSlides(history[index]);
            setHistoryIndex(index);
        } else {
            const index = historyIndex - 1;
            if (history[index] === undefined) {
                setRedoDisabled(false);
                setUndoDisabled(true);
            } else {
                setSlides(history[index]);
                setHistoryIndex(index); 
            }
        }
    }


    const redo = () => {

    }

    React.useEffect(() => {
        if (!!activeSlide) {
            setHistory(oldHistory => [...oldHistory, { slides: slides, activeSlide: activeSlide }]);
        }
    }, [slides])

    React.useEffect(() => {
        if (history.length > slides.count()) {
            if (historyIndex !== null) {
                // //disable redo
                // if (historyIndex === (history.length - 1)) {
                //     setRedoDisabled(true);
                // } else if (historyIndex < (history.length - 1)) {
                //     setRedoDisabled(false);
                // } else if (historyIndex === 0) {
                //     setUndoDisabled(true);
                // }
                setRedoDisabled(false);
            } else {
                setUndoDisabled(false);
            }
        }
    }, [history])

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttonContainer}>
                <Tooltip title="Undo">
                    <div>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={undoDisabled}
                            onClick={undo}
                        >
                            <UndoIcon />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
            <div className={classes.buttonContainer}>
                <Tooltip title="Redo">
                    <div>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={redoDisabled}
                            onClick={redo}
                        >
                            <RedoIcon />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    slideCount: state.presentation.get('slide_count'),
    slides: state.presentation.get('slides'),
    activeSlide: state.presentation.get('active_slide')
})

const mapDispatchToProps = dispatch => ({
    setSlides: (slides, activeSlide) => dispatch(setSlides(slides, activeSlide))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)