import React from 'react'
import Slide from 'components/Slide'
import { updateSlide, updateThumbnails, updateThumbnail } from 'actions'
import { SlideContext } from 'components/Slide/context';
import { connect } from 'react-redux';
import { 
    handleObjectMoving,
    handleObjectScaling,
    handleObjectRotating,
} from 'events/index';

import _ from 'lodash';

const Slidebar = ({ slides, updateThumbnail, activeSlide, activePresentation, updateSlide, token, updateThumbnails }) => {
    const canvas = React.useContext(SlideContext);

    const {
        canvasObj,
        hiddenCanvasObj
    } = canvas;


    React.useEffect(() => {
        if (!!canvasObj && activeSlide) {
            const updateSlideData = async () => {
                const canvasDimensions = {
                    height: canvasObj.height,
                    width: canvasObj.width
                }
                const thumbnail = await canvasObj.toDataURL({ format: 'png', quality: 0.4 });
                updateThumbnail(activeSlide, thumbnail);
                updateSlide(token, activeSlide, activePresentation, canvasObj.toJSON(), canvasDimensions);
            }

            const withDebounce = _.debounce(() => {
                return updateSlideData();
            }, 500)

            canvasObj.on({ 
                            'object:modified': updateSlideData, 
                            'text:changed': withDebounce, 
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
                    'text:changed': withDebounce,
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
                resolve({_id: slide._id, thumbnail: hiddenCanvasObj.toDataURL({ format: 'png', quality: 0.4})});
            });
        });
    }

    const renderSlides = () => {
        return slides.map((slide, index) => {
            return <Slide key={slide._id} index={index} slide={slide} />
        })
    }

    React.useEffect(() => {
        if (slides.count() > 0 && !!hiddenCanvasObj) {
            let slidesWithoutThumbnails = [];
            slides.forEach(slide => {
                if (slide.thumbnail === null || slide.thumbnail === undefined) {
                    slidesWithoutThumbnails.push(slide)
                }
            })
            if (slidesWithoutThumbnails.length > 0) {
                Promise.all(
                    slidesWithoutThumbnails.map(slide => getThumbnail(slide))
                ).then(result => {
                    updateThumbnails(result);
                })
            }
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
    token: state.user.get('token'),
    slides: state.presentation.get('slides'),
})
const mapDispatchToProps = dispatch => ({
    updateSlide: (token, slideID, presentationID, data, canvasDimensions) => dispatch(updateSlide(token, slideID, presentationID, data, canvasDimensions)),
    updateThumbnail: (slideID, thumbnail) => dispatch(updateThumbnail(slideID, thumbnail)),
    updateThumbnails: (slides) => dispatch(updateThumbnails(slides))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slidebar)