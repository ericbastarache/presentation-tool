import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setSlides, setActiveSlide } from 'actions/index';
import { deleteSlide, updateSlide, getNewSlide } from 'sagas/api';

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        margin: theme.spacing(1)
    },
    wrapper: {
        display: 'flex'
    }
}));

const UndoRedo = ({ canvas, slides, activeSlide, setSlides, token, activePresentation, setActiveSlide }) => {

    const classes = useStyles();
    const [undoDisabled, setUndoDisabled] = React.useState(true);
    const [redoDisabled, setRedoDisabled] = React.useState(true);
    const [history, setHistory] = React.useState([]);
    const [historyIndex, setHistoryIndex] = React.useState(null);

    const undo = () => {
        let index = null;
        if (historyIndex === null) {
            index = history.length - 2;
        } else {
            index = historyIndex - 1;
        }
            if (history[index].slides.count() !== history[index + 1].slides.count()) {
                const slideToDelete = history[index+1].slides.get(history[index+1].slides.findIndex(slide => slide._id === history[index+1].activeSlide));
                deleteSlide(token, slideToDelete._id, activePresentation);
            } else {
                if (history[index].activeSlide === history[index+1].activeSlide) {
                    const slideToUpdate = history[index+1].slides.get(history[index+1].slides.findIndex(slide => slide._id === history[index+1].activeSlide));
                    updateSlide(token, history[index+1].activeSlide, activePresentation, JSON.parse(slideToUpdate.data), slideToUpdate.canvasDimensions);
                }
            } 
            const slideToLoad = history[index].slides.get(history[index].slides.count() - 1);
            loadSlideDataOnCanvas(slideToLoad);
            setSlides(history[index]);
            setHistoryIndex(index);
            setRedoDisabled(false);
            if (index === 0) {
                setUndoDisabled(true);
            }
    }

    const loadSlideDataOnCanvas = (slide) => {
        canvas.clear();
        let slideData = JSON.parse(slide.data);
        canvas.loadFromJSON(slideData);
    }


    const redo = async () => {
        let index = historyIndex + 1;

        console.log(historyIndex, history)

        if (history[historyIndex].slides.count() !== history[index].slides.count()) {
            const createdSlide = await getNewSlide(activePresentation);
            const slideToUpdate = history[index].slides.get(history[index].slides.findIndex(slide => slide._id === history[index].activeSlide));
            updateSlide(token, createdSlide._id, slideToUpdate.data, slideToUpdate.canvasDimensions);
            setHistory(oldHistory => {
                oldHistory[index].slides.update(oldHistory[index].slides.findIndex(slide => slide._id === oldHistory[index].activeSlide), slide => {
                    return {
                        ...slide,
                        _id : createdSlide._id
                    }
                })
                oldHistory[index].activeSlide = slideToUpdate._id;
                return oldHistory;
            })
        } 
        
        // else {
        //     if (history[index].activeSlide === history[index+1].activeSlide) {
        //         const slideToUpdate = history[index+1].slides.get(history[index+1].slides.findIndex(slide => slide._id === history[index+1].activeSlide));
        //         updateSlide(token, history[index+1].activeSlide, activePresentation, JSON.parse(slideToUpdate.data), slideToUpdate.canvasDimensions);
        //     }
        // } 

        // if (index > history.length - 1) {
        //     setRedoDisabled(true);
        // } else {
        //     setHistoryIndex(index)
        // }
    }

    React.useEffect(() => {
        if (!!activeSlide) {
                let isThumbnailMissing = false;
                slides.forEach(slide => {
                    if (!slide.thumbnail) {
                        isThumbnailMissing = true;
                    }
                })
                if (historyIndex === null) {
                    if (!isThumbnailMissing) {
                        if (history.length > 0) {
                            let thumbnailUpdated = false;
                            history[history.length - 1].slides.forEach((hSlide, i) => {
                                slides.forEach((slide, j) => {
                                    if ((hSlide.data === slide.data) && (hSlide.thumbnail !== slide.thumbnail)) {
                                        thumbnailUpdated = true;
                                        setHistory(oldHistory => {
                                            oldHistory[oldHistory.length - 1].slides.update(i, (oldSlide) => {
                                                    return {
                                                        ...oldSlide,
                                                        thumbnail: slide.thumbnail
                                                    }
                                            })
                                            oldHistory.activeSlide = activeSlide;
                                            return oldHistory;
                                        })
                                        setUndoDisabled(false);
                                        setHistoryIndex(null);
                                        setRedoDisabled(true);
                                    }
                                })
                            })
                            if (!thumbnailUpdated) {
                                setHistory(oldHistory => [...oldHistory, { slides: slides, activeSlide: activeSlide }]);
                                setUndoDisabled(false);
                                setHistoryIndex(null);
                                setRedoDisabled(true);
                            }
                        }
                         else {
                            setHistory(oldHistory => [...oldHistory, { slides: slides, activeSlide: activeSlide }]);
                            if (history.length > 1) {
                                setUndoDisabled(false);
                            }
                            setHistoryIndex(null);
                            setRedoDisabled(true);
                        }
                    }
                } else {
                    if (!isThumbnailMissing) {
                        let thumbnailUpdated = false;
                        history[historyIndex].slides.forEach((hSlide, i) => {
                            slides.forEach((slide, j) => {
                                if ((hSlide.data === slide.data) && (hSlide.thumbnail !== slide.thumbnail)) {
                                    thumbnailUpdated = true;
                                    setHistory(oldHistory => {
                                        oldHistory[historyIndex].slides.update(i, (oldSlide) => {
                                                return {
                                                    ...oldSlide,
                                                    thumbnail: slide.thumbnail
                                                }
                                        })
                                        oldHistory.activeSlide = activeSlide;
                                        return oldHistory;
                                    })
                                    setUndoDisabled(false);
                                }
                            })
                        })
                        if (!thumbnailUpdated) {
                            setHistory(oldHistory => {
                                const updatedHistory = oldHistory.slice(0, historyIndex);
                                return [...updatedHistory, { slides: slides, activeSlide: activeSlide }]
                            });
                            setHistoryIndex(null);
                        }
                    }
                }
        }
    }, [slides, activeSlide])

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
            {/* <div className={classes.buttonContainer}>
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
            </div> */}
        </div>
    )
}

const mapStateToProps = state => ({
    slideCount: state.presentation.get('slide_count'),
    slides: state.presentation.get('slides'),
    activeSlide: state.presentation.get('active_slide'),
    activePresentation: state.presentation.get('active_presentation'),
    token: state.user.get('token'),
})

const mapDispatchToProps = dispatch => ({
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
    setSlides: (slides, activeSlide) => dispatch(setSlides(slides, activeSlide)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)