import { all, fork} from "redux-saga/effects";
import UserSaga from "./UserSaga";

const AllSaga = UserSaga;

export default function* RootSaga(){
    yield all(AllSaga);
}
