import React from 'react'
import { Grid } from '@material-ui/core'
import Toolbar from '../Toolbar/index'
import Presentationbar from '../Presentationbar/index'
import User from '../User/index'
import { connect } from 'react-redux'
import { addSlide, 
        toggleModal, 
        deleteSlide, 
        setActivePresentation,
        setPresentationTitle
        }  from '../../actions/index'


const Header = ({
                    addSlide, 
                    toggleModal, 
                    deleteSlide, 
                    isModalActive, 
                    presentations, 
                    activePresentation,
                    setPresentationTitle
                }) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Toolbar addSlide={addSlide} toggleModal={toggleModal} deleteSlide={deleteSlide}/>
            </Grid>
            <Grid item xs={4}>
                <Presentationbar 
                    toggleModal={toggleModal} 
                    isModalActive={isModalActive}
                    presentations={presentations} 
                    activePresentation={activePresentation}
                    setPresentationTitle={setPresentationTitle}
                />
            </Grid>
            <Grid item xs={4}>
                <User/>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        slides : state.presentation.get('slides').toJS(),
        activePresentation: state.presentation.get('active_presentation'),
        presentations: state.presentation.get('presentations').toJS(),
        isModalActive: state.toolbar.isModalActive
    }
}

const mapDispatchToProps = (dispatch) => ({
    addSlide: () => dispatch(addSlide()),
    toggleModal: () => dispatch(toggleModal()),
    deleteSlide: () => dispatch(deleteSlide()),
    setActivePresentation: (id) => dispatch(setActivePresentation(id)),
    setPresentationTitle: (id, title) => dispatch(setPresentationTitle(id, title))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)