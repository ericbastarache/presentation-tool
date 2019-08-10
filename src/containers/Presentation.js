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
    saveSlide: (slideID, slideData) => dispatch(saveSlide(slideID, slideData)),
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)