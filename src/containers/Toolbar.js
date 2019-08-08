import { connect } from 'react-redux'
import { addSlide } from '../actions'
import Toolbar from '../components/Toolbar'

const mapDispatchToProps = dispatch => ({
    addSlide: () => dispatch(addSlide())
})

export default connect (
    null,
    mapDispatchToProps
)(Toolbar)