import { LIST_USER_SUCCESS, DELETE_USER_SUCCESS, USER_INFO_SUCCESS } from '../actions/ActionTypes';

const UserReducer = (prevState = {
    listUser: [],
    userInfo: ""
}, action) => {
    switch (action.type) {
        case LIST_USER_SUCCESS:
            if (action.payload) {
                return {
                    ...prevState,
                    listUser: action.payload
                }
            }

            break;
        case DELETE_USER_SUCCESS:
            return {
                ...prevState
            }
        case USER_INFO_SUCCESS:
            if (action.payload) {
                return {
                    ...prevState,
                    userInfo: action.payload
                }
            }
            break;
        default:
            return prevState;
            break;
    }
}
export default UserReducer;