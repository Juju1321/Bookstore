import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import {
  getAllPosts,
  getChosenPost,
  setAllPosts,
  setChosenPost,
} from "src/redux/reducers/postSlice";
import API from "src/redux/api/index";
import { AllPostsResponse } from "src/redux/sagas/@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "src/utils/@globalTypes";

function* getAllPostsWorker() {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getAllPosts
  );
  if (ok && data) {
    yield put(setAllPosts(data.books));
  } else {
    console.warn("Error getting All posts", problem);
  }
}

function* getChosenPostWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<CardType> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (ok && data) {
    yield put(setChosenPost(data));
  } else {
    console.warn("Error getting post", problem);
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getChosenPost, getChosenPostWorker),
  ]);
}
