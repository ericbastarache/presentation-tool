import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
  token: null,
  isLoggedIn: false
});

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return state.merge(state, state.withMutations(map => {
        map.set('isLoggedIn', true)
          .set('token', action.token)
      }))
    case 'SET_USER_TOKEN':
      return state.merge(state, state.set('token', action.token))
    default:
      return state;
  }
}

export default userReducer;