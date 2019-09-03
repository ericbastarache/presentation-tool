import Presentation from 'components/Presentation'
import { 
    setActiveSlide,
    getNewPresentation,
    getPresentations
} from 'actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        slides:      state.presentation.get('slides').toJS(),
        activeSlide: state.presentation.get('active_slide'),
        presentations: state.presentation.get('presentations').toJS(),
        activePresentation: state.presentation.get('active_presentation'),
        isLoggedIn: state.user.get('isLoggedIn'),
        token: state.user.get('token')
    }
}

const mapDispatchToProps = (dispatch) => ({
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
    getNewPresentation: () => dispatch(getNewPresentation()),
    getPresentations: (token) => dispatch(getPresentations(token))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)