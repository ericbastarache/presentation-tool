import Presentation from '../components/Presentation'
import { updateSlide } from '../actions'
import { setActiveSlide } from '../actions'
import { getNewPresentation } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        slides:      state.presentation.get('slides').toJS(),
        activeSlide: state.presentation.get('active_slide'),
        presentations: state.presentation.get('presentations').toJS(),
        activePresentation: state.presentation.get('active_presentation')
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateSlide: (activeSlide, activePresentation, data, thumbnail) => dispatch(updateSlide(activeSlide, activePresentation, data, thumbnail)),
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
    getNewPresentation: () => dispatch(getNewPresentation())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)