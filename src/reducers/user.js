import User, {UserInfos} from "../classes/User";

const defaultState = new User();

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            let userData = action.userData;
            let userInfos = new UserInfos(userData.id,
                userData.fbid,
                userData.username,
                userData.first_name,
                userData.last_name,
                userData.email,
                userData.avatar);
            console.log("[REDUX] Received connexion: ", state.login(userInfos));
            return state.login(userInfos);

        case 'LOGOUT':
            console.log('[REDUX] Received logout.');
            return state.logout();
        default:
            return state;
    }
}

export function stateToUserProps(state) {
    return {
        user: state.user
    };
}
