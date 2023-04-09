import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType } from "src/utils/@globalTypes";
import {RootState} from "src/redux/store";

type InitialType = {
  postsList: CardListType;
};

const initialState: InitialType = {
  postsList: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<undefined>) => {},
    setAllPosts: (state, action: PayloadAction<CardListType>) => {
      state.postsList = action.payload;
    },
  },
});

export const { getAllPosts, setAllPosts } = postSlice.actions;

export default postSlice.reducer;

export const PostSelector = {
  getAllPosts: (state: RootState) => state.posts.postsList,
};
