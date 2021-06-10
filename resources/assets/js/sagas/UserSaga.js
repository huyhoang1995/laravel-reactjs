import { UserService } from "../libs/services";
import { call, takeLatest, put, fork } from "redux-saga/effects";
import {
    DO_LOGIN, LIST_USER, LIST_USER_SUCCESS,
    DELETE_USER, DELETE_USER_SUCCESS,
    ADD_USER, UPDATE_USER,
    USER_INFO, USER_INFO_SUCCESS
} from "../actions/ActionTypes";
import { doLoginReceive } from "../actions";
import { toast } from 'react-toastify';


function* doLogin(action) {
    try {
        let loginData = yield call(UserService.action.login, action.account, action.password);
        yield put(doLoginReceive(loginData, {}));
    } catch (error) {
        yield put(doLoginReceive({}, error));
    }
}

function* listUser(action) {
    try {
        const listItem = yield call(UserService.action.listUser, action.payload);
        // console.log(listItem.data)
        yield put({ type: LIST_USER_SUCCESS, payload: listItem.data });
    } catch (error) {
        console.log(error);
    }
}

function* userInfo() {
    try {
        const result = yield call(UserService.action.userInfo);
        yield put({ type:USER_INFO_SUCCESS,payload:result.data});

    } catch (error) {
        console.log(error);
    }
}


function* addUser(action) {
    try {
        const result = yield call(UserService.action.addUser, action.payload);
        yield put({ type: LIST_USER });
        toast.success("Thêm mới thành công !", {
            position: toast.POSITION.TOP_RIGHT
          })
    } catch (error) {
        toast.error("thêm mới thất bại !", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(error);
    }
}
function* updateUser(action) {
    // console.log(action);
    try {
        const result = yield call(UserService.action.updateUser,action.payload);
        yield put({ type: USER_INFO });
        toast.success("cập nhật thành công !", {
            position: toast.POSITION.TOP_RIGHT
          })
    } catch (error) {
        toast.error("cập nhật thất bại !", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(error);
    }
}

function* deleteUser(action) {
    try {
        const result = yield call(UserService.action.deleteUser, action.payload);
        yield put({ type: DELETE_USER_SUCCESS, payload: action.payload });
        yield put({ type: LIST_USER });
        toast.success("Xóa thành công !", {
            position: toast.POSITION.TOP_RIGHT
          })
    } catch (error) {
        toast.error("Xóa thất bại !", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(error.response);
    }
}

function* watchUserInfo(){
    yield takeLatest(USER_INFO,userInfo);
}
function* watchAddUser() {
    yield takeLatest(ADD_USER, addUser);
}
function* watchUpdateUser() {
    yield takeLatest(UPDATE_USER, updateUser);
}
function* watchDeleteUser() {
    yield takeLatest(DELETE_USER, deleteUser);
}

function* watchListUser() {
    yield takeLatest(LIST_USER, listUser);
}

function* watchDologin() {
    yield takeLatest(DO_LOGIN, doLogin);
}


const UserSaga = [
    fork(watchDologin),
    fork(watchListUser),
    fork(watchDeleteUser),
    fork(watchAddUser),
    fork(watchUpdateUser),
    fork(watchUserInfo),
];

export default UserSaga;