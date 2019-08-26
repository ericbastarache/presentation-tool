import Presentation from 'components/Presentation'
import { setActiveSlide } from 'actions'
import { getNewPresentation } from 'actions'
import { getNewTempPresentation } from 'actions'
import { loadTempPresentations } from 'actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        slides:      state.presentation.get('slides').toJS(),
        activeSlide: state.presentation.get('active_slide'),
        presentations: state.presentation.get('presentations').toJS(),
        activePresentation: state.presentation.get('active_presentation'),
        isLoggedIn: state.user.get('isLoggedIn')
    }
}

const mapDispatchToProps = (dispatch) => ({
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
    getNewPresentation: () => dispatch(getNewPresentation()),
    getNewTempPresentation: (userID) => dispatch(getNewTempPresentation(userID)),
    loadTempPresentations: (userID) => dispatch(loadTempPresentations(userID)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)