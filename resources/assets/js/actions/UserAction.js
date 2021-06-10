import { LIST_USER, DELETE_USER,ADD_USER,UPDATE_USER,USER_INFO } from './ActionTypes';

export function listUser(params) {
	return {
		type: LIST_USER,
		payload: params
	}

}

export function userInfo(data){
	return{
		type:USER_INFO,
		payload: data
	}
}

export function deleteUser(id) {
	return {
		type: DELETE_USER,
		payload: id
	}
}

export function addUser(data){
	return{
		type: ADD_USER,
		payload: data
	}
}
export function updateUser(data){
	return{
		type: UPDATE_USER,
		payload: data
	}
}