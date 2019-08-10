const INITIAL_STATE = {
    isModalActive : false
}

const toolbarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
        return Object.assign({}, state, {
            isModalActive: !state.isModalActive
            })
        default: 
            return state;
    }
}

export default toolbarReducer