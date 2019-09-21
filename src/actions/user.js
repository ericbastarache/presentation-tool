import * as ActionTypes from '../types/user'

export const logIn = (token) => ({
    type: ActionTypes.LOG_IN,
    token
})

export const setUserToken = (token) => ({
    type: ActionTypes.SET_USER_TOKEN,
    token
})