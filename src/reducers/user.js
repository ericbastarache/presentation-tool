import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
  token: null,
  isLoggedIn: false
});

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOG_IN':
      const token = action.token
      return state.merge(state, state.withMutations(map => {
        map.set('isLoggedIn', true)
          .set('token', token)
      }))
    default:
      return state;
  }
}

export default userReducer;