import React from 'react'
import { Grid } from '@material-ui/core'
import Toolbar from '../Toolbar/index'
import Presentationbar from '../Presentationbar/index'
import User from '../User/index'
import { connect } from 'react-redux'
import { getNewSlide, 
        toggleModal, 
        deleteSlide, 
        setActivePresentation,
        setPresentationTitle,
        createPresentation
        }  from '../../actions/index'


const Header = ({
                    getNewSlide, 
                    toggleModal, 
                    deleteSlide, 
                    isModalActive, 
                    presentations, 
                    activePresentation,
                    setPresentationTitle,
                    createPresentation,
                    setActivePresentation
                }) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Toolbar 
                    activePresentation={activePresentation} 
                    getNewSlide={getNewSlide} 
                    toggleModal={toggleModal} 
                    deleteSlide={deleteSlide}
                />
            </Grid>
            <Grid item xs={4}>
                <Presentationbar 
                    toggleModal={toggleModal} 
                    isModalActive={isModalActive}
                    presentations={presentations} 
                    activePresentation={activePresentation}
                    setPresentationTitle={setPresentationTitle}
                    createPresentation={createPresentation}
                    setActivePresentation={setActivePresentation}
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
    getNewSlide: (activePresentation) => dispatch(getNewSlide(activePresentation)),
    toggleModal: () => dispatch(toggleModal()),
    deleteSlide: () => dispatch(deleteSlide()),
    setActivePresentation: (id) => dispatch(setActivePresentation(id)),
    setPresentationTitle: (id, title) => dispatch(setPresentationTitle(id, title)),
    createPresentation: () => dispatch(createPresentation())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)