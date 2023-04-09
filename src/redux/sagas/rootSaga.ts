import {all} from "redux-saga/effects";
import postsSaga from "src/redux/sagas/postsSaga";


export default function* rootSaga() {
    yield all([postsSaga()])
}