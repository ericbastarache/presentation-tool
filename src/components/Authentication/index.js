import React from 'react'
import { logIn, setUserToken } from 'actions/user'
import {
    getNewPresentation,
    getPresentations, 
    getTempPresentations,
} from 'actions'
import { getNewToken } from 'sagas/api'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { uniqid } from 'lib/helpers'

const Authentication = ({
    logIn, 
    setUserToken, 
    getNewPresentation,
    getPresentations, 
    getTempPresentations,
}) => {
    React.useEffect(() => {

        const userToken = Cookies.get('userToken')
        const tempUserToken = Cookies.get('tempUserToken')

        if (!userToken && !tempUserToken) {
            const tokenBase = uniqid();
            getNewToken(tokenBase)
                .then(tokenObj => {
                    const {token} = tokenObj
                    Cookies.set('tempUserToken', token, 1)
                    setUserToken(token)
                    getTempPresentations(token)
                })
                .catch(error => console.log(error))
        }

        if (tempUserToken) {
            setUserToken(tempUserToken)
            getTempPresentations(tempUserToken)
        }

        if (userToken) {
            logIn(userToken)
            getPresentations(userToken)
        }

    },[])

    return (null)
}

const mapDispatchToProps = (dispatch) => ({
    logIn: (token) => dispatch(logIn(token)),
    setUserToken: (token) => dispatch(setUserToken(token)),
    getNewPresentation: (token) => dispatch(getNewPresentation(token)),
    getPresentations: (token) => dispatch(getPresentations(token)),
    getTempPresentations: (token) => dispatch(getTempPresentations(token))
});

export default connect(
    null,
    mapDispatchToProps
)(Authentication)