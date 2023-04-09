import { takeLatest, all, call, put } from "redux-saga/effects";
import {ApiResponse} from "apisauce";

import {getAllPosts, setAllPosts} from "src/redux/reducers/postSlice";
import API from "src/redux/api/index";

function* getAllPostsWorker() {
    const {ok,data,problem}:ApiResponse<any> = yield call(API.getAllPosts);
    if (ok) {
        yield put(setAllPosts(data.books))
    } else {
        console.warn("Error getting All posts", problem)
    }
}

export default function* postsSaga() {
  yield all([takeLatest(getAllPosts, getAllPostsWorker)]);
}
