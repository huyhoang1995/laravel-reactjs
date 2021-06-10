import { DO_LOGIN, DO_LOGIN_RECEIVE } from "./ActionTypes";

export const doLogin = (account, password) => {
    return {
        type: DO_LOGIN,
        account: account,
        password: password
    }
}

export const doLoginReceive = (payload, error) => {
    return {
        type: DO_LOGIN_RECEIVE,
        payload: payload,
        error: error
    }
}