import Presentation from '../components/Presentation'
import { saveSlide } from '../actions'
import { setActiveSlide } from '../actions'
import { changeSlideOrder } from '../actions'
import { createPresentation } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        slides:      state.presentation.get('slides').toJS(),
        activeSlide: state.presentation.active_slide,
        presentations: state.presentation.get('presentations').toJS()
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveSlide: (slideID, slideData) => dispatch(saveSlide(slideID, slideData)),
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
    changeSlideOrder: (selectedSlide, hoverSlide) => dispatch(changeSlideOrder(selectedSlide, hoverSlide)),
    createPresentation: () => dispatch(createPresentation())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)