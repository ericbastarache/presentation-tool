import Header from '../components/Header'
import { connect } from 'react-redux'
import { addSlide } from '../actions/index'
import { toggleModal } from '../actions/index'

const mapStateToProps = state => {
    return {
        slides : state.presentation.slides,
        active_presentation: state.presentation.active_presentation,
        presentations: state.presentation.presentations,
        isModalActive: state.toolbar.isModalActive
    }
}

const mapDispatchToProps = (dispatch) => ({
    addSlide: () => dispatch(addSlide()),
    toggleModal: () => dispatch(toggleModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)