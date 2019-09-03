import React from 'react'
import Slide from 'components/Slide'
import { updateSlide } from 'actions'
import { SlideContext } from 'components/Slide/context';
import { connect } from 'react-redux'

const Slidebar = ({ slides, activeSlide, activePresentation, updateSlide, token }) => {
    const canvas = React.useContext(SlideContext)
    const {
        canvasObj
    } = canvas;
    React.useEffect(() => {
        if (!!canvasObj) {
            const updateSlideData = async () => {
                const canvasDimensions = {
                    height: canvasObj.height,
                    width: canvasObj.width
                }
                updateSlide(token, activeSlide, activePresentation, canvasObj.toJSON(), canvasDimensions)
            }

            canvasObj.on({ 
                            'object:modified': updateSlideData, 
                            'text:changed': updateSlideData, 
                            'object:added': updateSlideData,
                        });
            //Remove the event listener when the effect's params have changed
            //when activeSlide or the canvasObj change, the event handlers are destroyed
            //so new ones can be initialized
            return () => {
                canvasObj.off({ 
                    'object:modified': updateSlideData, 
                    'text:changed': updateSlideData, 
                    'object:added': updateSlideData 
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
    activePresentation: state.presentation.get('active_presentation'),
    token: state.user.get('token')
})

const mapDispatchToProps = dispatch => ({
    updateSlide: (token, slideID, presentationID, data, canvasDimensions) => dispatch(updateSlide(token, slideID, presentationID, data, canvasDimensions))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slidebar)