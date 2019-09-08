import React from 'react'
import Slide from 'components/Slide'
import { updateSlide } from 'actions'
import { SlideContext } from 'components/Slide/context';
import { connect } from 'react-redux';
import { 
    handleObjectMoving,
    handleObjectScaling,
    handleObjectRotating

} from 'events/index';


const Slidebar = ({ slides, activeSlide, activePresentation, updateSlide, token }) => {
    const canvas = React.useContext(SlideContext)
    const [slidesWithThumbnails, setSlidesWithThumbnails] = React.useState([])

    const {
        canvasObj,
        hiddenCanvasObj
    } = canvas;


    React.useEffect(() => {
        if (!!canvasObj) {
            const updateSlideData = async () => {
                const canvasDimensions = {
                    height: canvasObj.height,
                    width: canvasObj.width
                }
                const thumbnail = await canvasObj.toDataURL({ format: 'png', quality: 0.4 })
                updateSlide(token, activeSlide, activePresentation, canvasObj.toJSON(), canvasDimensions, thumbnail)
            }

            canvasObj.on({ 
                            'object:modified': updateSlideData, 
                            'text:changed': updateSlideData, 
                            'object:added': updateSlideData,
                            'object:moving': handleObjectMoving,
                            'object:scaling': handleObjectScaling,
                            "object:rotating": handleObjectRotating
                        });
            //Remove the event listener when the effect's params have changed
            //when activeSlide or the canvasObj change, the event handlers are destroyed
            //so new ones can be initialized
            return () => {
                canvasObj.off({ 
                    'object:modified': updateSlideData, 
                    'text:changed': updateSlideData, 
                    'object:added': updateSlideData,
                    'object:moving': handleObjectMoving,
                    'object:scaling': handleObjectScaling,
                    "object:rotating": handleObjectRotating
                });
            };
        }
    }, [canvasObj, activeSlide]);


    const getThumbnail = (slide) => {
        return new Promise((resolve, reject) => {
            hiddenCanvasObj.clear();
            let slideData = JSON.parse(slide.data);
            hiddenCanvasObj.loadFromJSON(slideData, () => {
                resolve(hiddenCanvasObj.toDataURL({ format: 'png', quality: 0.4}));
            });
        });
    }

    const renderSlides = () => {
        return slidesWithThumbnails.map((slide, index) => {
            return <Slide key={slide._id} index={index} slide={slide} />
        })
    }

    React.useEffect(() => {
        if (slides && hiddenCanvasObj) {
            Promise.all(
                slides.map(slide => getThumbnail(slide))
            ).then(result => {
                slides.forEach((slide, index) => {
                    slide.thumbnail = result[index]
                })
                setSlidesWithThumbnails(slides)
            })
        }
    },[slides])

    return (
        <>
        {renderSlides()}
        </>
    )
}

const mapStateToProps = state => ({
    activeSlide: state.presentation.get('active_slide'),
    activePresentation: state.presentation.get('active_presentation'),
    token: state.user.get('token')
})

const mapDispatchToProps = dispatch => ({
    updateSlide: (token, slideID, presentationID, data, canvasDimensions, thumbnail) => dispatch(updateSlide(token, slideID, presentationID, data, canvasDimensions, thumbnail))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slidebar)