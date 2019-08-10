import Header from '../components/Header'
import { connect } from 'react-redux'
import { addSlide } from '../actions/index'
import { toggleModal } from '../actions/index'

const mapStateToProps = state => {
    return {
        slides : state.presentation.get('slides').toJS(),
        active_presentation: state.presentation.get('active_presentation'),
        presentations: state.presentation.get('presentations').toJS(),
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