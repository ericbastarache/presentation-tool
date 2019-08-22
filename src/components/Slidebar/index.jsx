import React from 'react'
import Slide from '../Slide'
import { updateSlide } from '../../actions'
import { SlideContext } from 'components/Slide/context';
import { connect } from 'react-redux'

const Slidebar = ({ slides, activeSlide, activePresentation, updateSlide }) => {
    const canvas = React.useContext(SlideContext)
    const {
        canvasObj
    } = canvas;
    // const imageRefs = React.useRef(slides.map(() => React.createRef()));
    React.useEffect(() => {
        if (!!canvasObj) {
            const getThumbnail = () => {
                return new Promise(resolve => {
                    resolve(canvasObj.toDataURL({ format: 'png', quality: 0.8 }));
                });
            }
            const updateSlideWithThumbnail = async () => {
                const thumbnail = await getThumbnail()
                updateSlide(activeSlide, activePresentation, canvasObj.toJSON(), thumbnail)
            }
            canvasObj.on({ 
                            'object:modified': updateSlideWithThumbnail, 
                            'text:changed': updateSlideWithThumbnail, 
                            'object:added': updateSlideWithThumbnail 
                        });
            //Remove the event listener when the effect's params have changed
            //when activeSlide or the canvasObj change, the event handlers are destroyed
            //so new ones can be initialized
            return () => {
                canvasObj.off({ 
                    'object:modified': updateSlideWithThumbnail, 
                    'text:changed': updateSlideWithThumbnail, 
                    'object:added': updateSlideWithThumbnail 
                });
            };
        }
    }, [canvasObj, activeSlide]);

    const renderSlides = () => {
        return slides.map((slide, index) => {
            return <Slide
                key={slide._id}
                index={index}
                slide={slide}
            />
        })
    }
    return (
        <>
            {renderSlides()}
        </>
    )
}

const mapStateToProps = state => ({
    activeSlide: state.presentation.get('active_slide'),
    activePresentation: state.presentation.get('active_presentation')
})

const mapDispatchToProps = dispatch => ({
    updateSlide: (slideID, presentationID, data, thumbnail) => dispatch(updateSlide(slideID, presentationID, data, thumbnail))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slidebar)