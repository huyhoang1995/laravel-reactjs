import { app } from "./config";
import LoginComponent from "./components/user/LoginComponent";
import UserComponent from "./components/user/UserComponent";
import UserInfoComponent from "./components/user/UserInfoComponent";
const MyRouter = [
    {
        path: app.baseUrl + '/user',
        component: UserComponent
    },
    {
        path: app.baseUrl + '/login',
        component: LoginComponent
    },
    {
        path: app.baseUrl + '/userinfo',
        component: UserInfoComponent
    },
];

export default MyRouter;