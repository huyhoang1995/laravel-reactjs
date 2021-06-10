import { DO_LOGIN, DO_LOGIN_RECEIVE } from "../actions/ActionTypes";

const LoginReducer = (prevState = {
    payload: {},
    error: {}
}, action) => {
    switch (action.type) {
        case DO_LOGIN_RECEIVE:
            return {
                ...prevState,
                payload: action.payload,
                error: action.error
            }
            break;
    
        default:
            return prevState;
            break;
    }
    return {};
}

export default LoginReducer;