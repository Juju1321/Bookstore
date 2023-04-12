import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardType } from "src/utils/@globalTypes";
import { RootState } from "src/redux/store";

type InitialType = {
  postsList: CardListType;
  chosenPost: CardType | null;
};

const initialState: InitialType = {
  postsList: [],
  chosenPost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<undefined>) => {},
    setAllPosts: (state, action: PayloadAction<CardListType>) => {
      state.postsList = action.payload;
    },
    getChosenPost: (_, __: PayloadAction<string>) => {},
    setChosenPost: (state, action: PayloadAction<CardType | null>) => {
      state.chosenPost = action.payload;
    },
  },
});

export const { getAllPosts, setAllPosts, getChosenPost, setChosenPost } =
  postSlice.actions;

export default postSlice.reducer;

export const PostSelector = {
  getAllPosts: (state: RootState) => state.posts.postsList,
  getChosenPost: (state: RootState) => state.posts.chosenPost,
};
