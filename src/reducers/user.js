import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
  token: null,
  isLoggedIn: false
});

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return state.merge(state, state.update('isLoggedIn', true))
    default:
      return state;
  }
}

export default userReducer;