import Presentation from '../components/Presentation'
import { saveSlide } from '../actions'
import { setActiveSlide } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        slides : state.presentation.get('slides').toJS(),
        activeSlide: state.presentation.get('active_slide')
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveSlide: (slideIndex, slideData) => dispatch(saveSlide(slideIndex, slideData)),
    setActiveSlide: (slideIndex) => dispatch(setActiveSlide(slideIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)