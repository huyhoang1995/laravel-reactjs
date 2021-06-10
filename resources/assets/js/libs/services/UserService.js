import axios from "axios";
import { app } from "../../config";
export const UserService = {
    data: {
        listUser: (page, perPage, status, freeText) => {
            return {
                page: page || "",
                perPage: perPage || "",
                status: status || "",
                freeText: freeText || "",
            }
        }
    },
    action: {
        login: (account, password) => {
            var url = app.siteUrl + '/login';
            return axios.post(url, {
                account: account,
                password: password
            });
        },
        listUser(params) {
            var url = axios.get(app.siteUrl + '/rest/users', { params })
            return url;
        },
        deleteUser(id) {
            var url = axios.delete(app.siteUrl + "/rest/users/" + id);
            return url;
        },
        addUser(data) {
            var config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            var url = axios.post(app.siteUrl + "/rest/users", data, config);
            return url;
        },
        userInfo() {
            var url = axios.get(app.siteUrl + '/rest/users/personal');
            return url;
        },
        updateUser(data) {
            var config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            var url = axios.post(app.siteUrl + "/rest/users/personal", data, config);
            return url;
        }


    }
}