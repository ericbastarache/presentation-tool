import React from 'react'
import { logIn, setUserToken } from 'actions/user'
import {
    getNewPresentation,
    getPresentations, 
    getNewTempPresentation,
    loadTempPresentations,
} from 'actions'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { uniqid } from 'lib/helpers'

const Authentication = ({
    logIn, 
    setUserToken, 
    getNewPresentation,
    getPresentations, 
    getNewTempPresentation,
    loadTempPresentations,
}) => {
    React.useEffect(() => {

        const userToken = Cookies.get('userToken')
        const tempUserToken = Cookies.get('tempUserToken')

        if (!userToken && !tempUserToken) {
            const token = uniqid();
            Cookies.set('tempUserToken', token, 1)
            setUserToken(token)
            getNewTempPresentation(token)
        }

        if (tempUserToken) {
            setUserToken(tempUserToken)
            loadTempPresentations(tempUserToken)
        }

        if (userToken) {
            logIn(userToken)
            //check if presentations exist, if not, then get new presentations, otherwise, get old presentations
        }

    },[])

    return (null)
}

const mapDispatchToProps = (dispatch) => ({
    logIn: (token) => dispatch(logIn(token)),
    setUserToken: (token) => dispatch(setUserToken(token)),
    getNewPresentation: (token) => dispatch(getNewPresentation(token)),
    getPresentations: (token) => dispatch(getPresentations(token)),
    getNewTempPresentation: (token) => dispatch(getNewTempPresentation(token)),
    loadTempPresentations: (token) => dispatch(loadTempPresentations(token))
});

export default connect(
    null,
    mapDispatchToProps
)(Authentication)