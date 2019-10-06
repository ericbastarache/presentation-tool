import Presentation from 'components/Presentation'
import { 
    setActiveSlide,
} from 'actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        slides:      state.presentation.get('slides'),
        activeSlide: state.presentation.get('active_slide'),
    }
}

const mapDispatchToProps = (dispatch) => ({
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)