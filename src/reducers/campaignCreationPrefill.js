const defaultState = {
    game: 0,
    experience: 0
};

export default function CCPrefillReducer(state = defaultState, action) {
    switch (action.type) {
        case 'STEP1':
            let nState = {
                game: action.data.game,
                experience: action.data.experience
            };
            return nState;

        default:
            return state;
    }
}

export function stateToUserProps(state) {
    return {
        user: state.user
    };
}
