import { connect } from 'react-redux'
import { changeSlideOrder } from '../actions'
import { setActiveSlide } from '../actions'
import Slidebar from '../components/Slidebar'

const mapStateToProps = state => {
    return {
        slides : state.presentation.slides
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeSlideOrder: (selectedSlide, hoverSlide) => dispatch(changeSlideOrder(selectedSlide, hoverSlide)),
    setActiveSlide: (slideID) => dispatch(setActiveSlide(slideID)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slidebar)