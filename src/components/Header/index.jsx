import React from 'react'
import { Grid } from '@material-ui/core'
import Presentationbar from '../Presentationbar/index'
import { connect } from 'react-redux'
import {
        toggleModal, 
        setActivePresentation,
        setPresentationTitle,
        createPresentation
        }  from '../../actions/index'


const Header = ({
                    toggleModal, 
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
    toggleModal: () => dispatch(toggleModal()),
    setActivePresentation: (id) => dispatch(setActivePresentation(id)),
    setPresentationTitle: (id, title) => dispatch(setPresentationTitle(id, title)),
    createPresentation: () => dispatch(createPresentation())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)