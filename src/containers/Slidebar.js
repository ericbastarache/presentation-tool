import { connect } from 'react-redux'
import { changeSlideOrder } from '../actions'
import { setActiveSlide } from '../actions'
import Slidebar from '../components/Slidebar'

const mapStateToProps = state => {
    return {slides : state.presentation.get('slides')}
}

const mapDispatchToProps = (dispatch) => ({
    changeSlideOrder: (selectedSlide, hoverSlide) => dispatch(changeSlideOrder(selectedSlide, hoverSlide)),
    setActiveSlide: (slideIndex) => dispatch(setActiveSlide(slideIndex)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slidebar)