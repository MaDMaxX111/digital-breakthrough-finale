import actions from "./actions";

export const initState = {
    isLogged: false,
    // isLogged: true,
    error: null,
    userData: {},
};

export default (state = initState, {type, payload}) => {
    switch (type) {

        case actions.LOGIN_ERROR:
            return {
                ...state,
                error: payload,
            };

        case actions.CHECK_AUTHORIZATION_SUCCESS:
            return {
                ...state,
                isLogged: true,
                error: null,
                userData: payload,
            };

        case actions.LOGOUT:
            return initState;

        default:
            return state;
    }
}
